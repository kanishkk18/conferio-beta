generator client {
  provider = "prisma-client-js"
  output   = "../node_modules/.prisma/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  OWNER
  MEMBER
}

model Account {
  id                String  @id @default(uuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(uuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model User {
  id                     String        @id @default(uuid())
  name                   String
  email                  String        @unique
  emailVerified          DateTime?
  password               String?
  image                  String?
  createdAt              DateTime      @default(now())
  updatedAt              DateTime      @updatedAt
  invalid_login_attempts Int           @default(0)
  lockedAt               DateTime?
  accounts               Account[]
  invitations            Invitation[]
  sessions               Session[]
  teamMembers            TeamMember[]
  boards                 Board[]
  columns                Column[]
  tasks                  Task[]
  subtasks               Subtask[]
  category               Category[]
  myTasks                MyTask[]
  profile                Profile?      @relation(fields: [profileId], references: [id])
  profileId              String?
  events                 Event[]
  integrations           Integration[]
  availability           Availability?
  meetings               Meeting[]
  username               String?       @unique
  imageUrl               String?
}

model Team {
  id              String       @id @default(uuid())
  name            String
  slug            String       @unique
  domain          String?      @unique
  defaultRole     Role         @default(MEMBER)
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @default(now())
  billingId       String?
  billingProvider String?
  apiKeys         ApiKey[]
  invitations     Invitation[]
  members         TeamMember[]

  @@index([billingId])
}

model TeamMember {
  id        String   @id @default(uuid())
  teamId    String
  userId    String
  role      Role     @default(MEMBER)
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
  team      Team     @relation(fields: [teamId], references: [id], onDelete: Cascade)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([teamId, userId])
  @@index([userId])
}

model Invitation {
  id             String   @id @default(uuid())
  teamId         String
  email          String?
  role           Role     @default(MEMBER)
  token          String   @unique
  expires        DateTime
  invitedBy      String
  createdAt      DateTime @default(now())
  updatedAt      DateTime @default(now())
  allowedDomains String[] @default([])
  sentViaEmail   Boolean  @default(true)
  user           User     @relation(fields: [invitedBy], references: [id], onDelete: Cascade)
  team           Team     @relation(fields: [teamId], references: [id], onDelete: Cascade)

  @@unique([teamId, email])
  @@index([email])
}

model PasswordReset {
  id        Int      @id @default(autoincrement())
  email     String
  token     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  expiresAt DateTime
}

model ApiKey {
  id         String    @id @default(uuid())
  name       String
  teamId     String
  hashedKey  String    @unique
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @default(now())
  expiresAt  DateTime?
  lastUsedAt DateTime?
  team       Team      @relation(fields: [teamId], references: [id], onDelete: Cascade)

  @@index([teamId])
}

model Subscription {
  id         String    @id
  customerId String
  priceId    String
  active     Boolean   @default(false)
  startDate  DateTime
  endDate    DateTime
  cancelAt   DateTime?
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @default(now())

  @@index([customerId])
}

model Service {
  id          String   @id @default(uuid())
  description String
  features    String[]
  image       String
  name        String
  created     DateTime
  createdAt   DateTime @default(now())
  updatedAt   DateTime @default(now())
  Price       Price[]
}

model Price {
  id            String   @id @default(uuid())
  billingScheme String
  currency      String
  serviceId     String
  amount        Int?
  metadata      Json
  type          String
  created       DateTime
  service       Service  @relation(fields: [serviceId], references: [id], onDelete: Cascade)
}

model jackson_store {
  key           String          @id(map: "_jackson_store_key") @db.VarChar(1500)
  value         String
  iv            String?         @db.VarChar(64)
  tag           String?         @db.VarChar(64)
  createdAt     DateTime        @default(now()) @db.Timestamp(6)
  modifiedAt    DateTime?       @db.Timestamp(6)
  namespace     String?         @db.VarChar(256)
  jackson_index jackson_index[]

  @@index([namespace], map: "_jackson_store_namespace")
  @@ignore
}

model jackson_index {
  id       Int           @id(map: "_jackson_index_id") @default(autoincrement())
  key      String        @db.VarChar(1500)
  storeKey String        @db.VarChar(1500)
  store    jackson_store @relation(fields: [storeKey], references: [key], onDelete: Cascade, onUpdate: NoAction)

  @@index([key], map: "_jackson_index_key")
  @@index([key, storeKey], map: "_jackson_index_key_store")
  @@ignore
}

model jackson_ttl {
  key       String @id(map: "jackson_ttl_key") @db.VarChar(1500)
  expiresAt BigInt

  @@index([expiresAt], map: "_jackson_ttl_expires_at")
  @@ignore
}

model Board {
  id         Int       @id @default(autoincrement())
  uuid       String    @unique @db.Char(36)
  created_at DateTime? @default(now()) @db.Timestamp(0)
  updated_at DateTime? @default(now()) @db.Timestamp(0)
  name       String    @db.VarChar(255)
  userId     String
  columns    Column[]  @relation("BoardColumn")
  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model Column {
  id         Int       @id @default(autoincrement())
  uuid       String    @unique @db.Char(36)
  created_at DateTime? @default(now()) @db.Timestamp(0)
  updated_at DateTime? @default(now()) @db.Timestamp(0)
  name       String    @db.VarChar(255)
  board_uuid String
  position   Int
  color      String    @db.VarChar(255)
  userId     String

  board Board  @relation("BoardColumn", fields: [board_uuid], references: [uuid], onDelete: Cascade)
  user  User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  tasks Task[] @relation("ColumnTask")

  @@index([board_uuid])
}

model Task {
  id          Int       @id @default(autoincrement())
  uuid        String    @unique @db.Char(36)
  created_at  DateTime? @default(now()) @db.Timestamp(0)
  updated_at  DateTime? @default(now()) @db.Timestamp(0)
  name        String    @db.VarChar(255)
  description String?   @db.VarChar(1023)
  position    Int
  column_uuid String
  userId      String
  column      Column    @relation("ColumnTask", fields: [column_uuid], references: [uuid], onDelete: Cascade)
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  subtasks    Subtask[] @relation("TaskSubtask")

  @@index([column_uuid])
}

model Category {
  id        String   @id @default(uuid())
  name      String
  color     String?
  icon      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  myTasks MyTask[]

  userId String
  user   User   @relation(fields: [userId], references: [id])

  @@map("categories")
}

model MyTask {
  id          String   @id @default(uuid())
  title       String
  description String?
  dueTime     DateTime
  itsDone     Boolean
  priority    String   @default("medium")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  notification Notification[]

  userId     String
  user       User      @relation(fields: [userId], references: [id])
  categoryId String?
  category   Category? @relation(fields: [categoryId], references: [id])

  @@map("myTasks")
}

model Notification {
  id        String   @id @default(uuid())
  message   String
  createdAt DateTime @default(now())
  read      Boolean  @default(false)

  userId String
  taskId String?

  myTask MyTask? @relation(fields: [taskId], references: [id])
}

model Subtask {
  id         Int       @id @default(autoincrement())
  uuid       String    @unique @db.Char(36)
  created_at DateTime? @default(now()) @db.Timestamp(0)
  updated_at DateTime? @default(now()) @db.Timestamp(0)
  name       String    @db.VarChar(255)
  task_uuid  String
  completed  Boolean   @default(false)
  userId     String
  task       Task      @relation("TaskSubtask", fields: [task_uuid], references: [uuid], onDelete: Cascade)
  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([task_uuid])
}

model Profile {
  id       String  @id @default(uuid())
  name     String
  imageUrl String  @db.Text
  email    String  @db.Text
  password String?

  servers  Server[]
  members  Member[]
  channels Channel[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  User      User[]

  @@unique([email])
}

model Server {
  id         String @id @default(uuid())
  name       String
  imageUrl   String @db.Text
  inviteCode String @unique

  profileId String
  profile   Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)

  members  Member[]
  channels Channel[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([profileId])
}

enum MemberRole {
  ADMIN
  MODERATOR
  GUEST
}

model Member {
  id   String     @id @default(uuid())
  role MemberRole @default(GUEST)

  profileId String
  profile   Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)

  serverId String
  server   Server @relation(fields: [serverId], references: [id], onDelete: Cascade)

  messages       Message[]
  directMessages DirectMessage[]

  conversationsInitiated Conversation[] @relation("MemberOne")
  conversationsReceived  Conversation[] @relation("MemberTwo")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([profileId])
  @@index([serverId])
}

enum ChannelType {
  TEXT
  AUDIO
  VIDEO
}

model Channel {
  id   String      @id @default(uuid())
  name String
  type ChannelType @default(TEXT)

  profileId String
  profile   Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)

  serverId String
  server   Server @relation(fields: [serverId], references: [id], onDelete: Cascade)

  messages Message[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([profileId])
  @@index([serverId])
}

model Message {
  id      String @id @default(uuid())
  content String @db.Text

  fileUrl String? @db.Text

  memberId String
  member   Member @relation(fields: [memberId], references: [id], onDelete: Cascade)

  channelId String
  channel   Channel @relation(fields: [channelId], references: [id], onDelete: Cascade)

  deleted Boolean @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([channelId])
  @@index([memberId])
}

model Conversation {
  id String @id @default(uuid())

  memberOneId String
  memberOne   Member @relation("MemberOne", fields: [memberOneId], references: [id], onDelete: Cascade)

  memberTwoId String
  memberTwo   Member @relation("MemberTwo", fields: [memberTwoId], references: [id], onDelete: Cascade)

  directMessages DirectMessage[]

  @@unique([memberOneId, memberTwoId])
  @@index([memberTwoId])
}

model DirectMessage {
  id      String  @id @default(uuid())
  content String  @db.Text
  fileUrl String? @db.Text

  memberId String
  member   Member @relation(fields: [memberId], references: [id], onDelete: Cascade)

  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)

  deleted Boolean @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([memberId])
  @@index([conversationId])
}

model Event {
  id           String            @id @default(cuid())
  title        String
  description  String?
  duration     Int               @default(30)
  slug         String
  isPrivate    Boolean           @default(false)
  locationType EventLocationType

  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  meetings Meeting[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("events")
}

model Integration {
  id           String              @id @default(cuid())
  provider     IntegrationProvider
  category     IntegrationCategory
  appType      IntegrationAppType  @map("app_type")
  accessToken  String              @map("access_token")
  refreshToken String?             @map("refresh_token")
  expiryDate   BigInt?             @map("expiry_date")
  metadata     Json
  isConnected  Boolean             @default(true)

  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, appType], name: "userId_appType")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("integrations")
}

model Availability {
  id      String @id @default(cuid())
  timeGap Int    @default(30)

  userId String @unique
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  days DayAvailability[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("availability")
}

model DayAvailability {
  id          String    @id @default(cuid())
  day         DayOfWeek
  startTime   DateTime
  endTime     DateTime
  isAvailable Boolean   @default(true)

  availabilityId String
  availability   Availability @relation(fields: [availabilityId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("day_availability")
}

model Meeting {
  id              String        @id @default(cuid())
  guestName       String
  guestEmail      String
  additionalInfo  String?
  startTime       DateTime
  endTime         DateTime
  meetLink        String
  calendarEventId String
  calendarAppType String
  status          MeetingStatus @default(SCHEDULED)

  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  eventId String
  event   Event  @relation(fields: [eventId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("meetings")
}

enum EventLocationType {
  GOOGLE_MEET_AND_CALENDAR
  ZOOM_MEETING
}

enum IntegrationProvider {
  GOOGLE
  ZOOM
  MICROSOFT
}

enum IntegrationAppType {
  GOOGLE_MEET_AND_CALENDAR
  ZOOM_MEETING
  OUTLOOK_CALENDAR
}

enum IntegrationCategory {
  CALENDAR_AND_VIDEO_CONFERENCING
  VIDEO_CONFERENCING
  CALENDAR
}

enum DayOfWeek {
  SUNDAY
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY
}

enum MeetingStatus {
  SCHEDULED
  CANCELLED
}
