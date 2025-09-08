import { prisma } from '@/lib/prisma'
import { formatBytes } from '@/lib/utils'

export async function getUserAnalyticsWithChartService(
  userId: string,
  filter: { dateFrom?: Date; dateTo?: Date }
) {
  const { dateFrom, dateTo } = filter

  const where: any = { userId }
  if (dateFrom) where.createdAt = { gte: dateFrom }
  if (dateTo) where.createdAt = { ...where.createdAt, lte: dateTo }

  // Get chart data
  const files = await prisma.file.findMany({
    where,
    select: {
      createdAt: true,
      size: true,
    },
  })

  // Group by date
  const chartData = files.reduce((acc: any, file) => {
    const date = file.createdAt.toISOString().split('T')[0]
    if (!acc[date]) {
      acc[date] = { uploadedFiles: 0, usages: 0 }
    }
    acc[date].uploadedFiles += 1
    acc[date].usages += file.size
    return acc
  }, {})

  const formattedChartData = Object.entries(chartData).map(([date, data]: [string, any]) => ({
    date,
    uploadedFiles: data.uploadedFiles,
    usages: data.usages,
    formattedUsages: formatBytes(data.usages),
  }))

  // Get totals
  const totaluploadFilesForPeriod = files.length
  const totalUsageForPeriod = files.reduce((sum, file) => sum + file.size, 0)

  // Get storage metrics
  const storage = await prisma.storage.findUnique({
    where: { userId },
  })

  const totalUsage = await prisma.file.aggregate({
    where: { userId },
    _sum: { size: true },
  })

  const storageUsageSummary = {
    totalUsage: totalUsage._sum.size || 0,
    quota: Number(storage?.storageQuota || 0),
    formattedTotalUsage: formatBytes(totalUsage._sum.size || 0),
    formattedQuota: formatBytes(Number(storage?.storageQuota || 0)),
  }

  return {
    chart: formattedChartData,
    totaluploadFilesForPeriod,
    totalUsageForPeriod: formatBytes(totalUsageForPeriod),
    storageUsageSummary,
  }
}