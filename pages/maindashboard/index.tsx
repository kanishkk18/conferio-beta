'use client';

import React, { useState, useEffect } from 'react';

import Mainsidebar from '@/components/ui/mainSideBar';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { AlarmClock, CloudSunIcon, Plus } from 'lucide-react';
import UserAvatar from '@/components/ui/comp-377';

import {
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelRoot,
  FloatingPanelTrigger,
  FloatingPanelBody,
  FloatingPanelHeader,
} from '@/components/ui/floatingPanel';
import { Badge } from '@/components/ui/badge';
import { Sun } from 'lucide-react';
import { FamilyButtonDemo } from '@/components/ui/multiButton';
import moment from 'moment';
import DashMusic from '../music/dashMusic';
import MusicProvider from '@/components/music-components/music-provider';
import TaskEmptyState from '@/components/tasks/task-empty-state';
import { UserTask } from 'interfaces/task';
import { DashboardTaskList } from '@/components/tasks/dashboard-task-list';
// import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });
  const [date, setDate] = useState<Date | undefined>(new Date());
  type ForecastDay = { day: string; temp: number };
  const [task, setTask] = useState<UserTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [weather, setWeather] = useState<{
    temperature: string | number;
    feelsLike: string | number;
    high: string | number;
    low: string | number;
    condition: string;
    humidity: string | number;
    wind: string | number;
    precipitation: string | number;
    forecast: ForecastDay[];
  }>({
    temperature: '--',
    feelsLike: '--',
    high: '--',
    low: '--',
    condition: '--',
    humidity: '--',
    wind: '--',
    precipitation: '--',
    forecast: [],
  });

  // Timer to update time
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get user location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error fetching location: ', error.message);
          alert('Unable to fetch your location. Please allow location access.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/task', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error('Error fetching user session:', error);
      }
      setIsLoading(false);
    };

    const verifyUser = async () => {
      const response = await fetch('/api/auth/services-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to verify user');
      }
    };

    fetchTasks();
    verifyUser();
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      if (location.latitude && location.longitude) {
        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&temperature_unit=celsius&timezone=auto`
          );
          const data = await response.json();

          // Map weather codes to descriptions
          const mapWeatherCodeToDescription = (code: number): string => {
            const weatherDescriptions: { [key: number]: string } = {
              0: 'Clear sky',
              1: 'Mainly clear',
              2: 'Partly cloudy',
              3: 'Overcast',
              45: 'Fog',
              48: 'Depositing rime fog',
              51: 'Light drizzle',
              53: 'Moderate drizzle',
              55: 'Dense drizzle',
              61: 'Slight rain',
              63: 'Moderate rain',
              65: 'Heavy rain',
              71: 'Slight snow',
              73: 'Moderate snow',
              75: 'Heavy snow',
              80: 'Slight rain showers',
              81: 'Moderate rain showers',
              82: 'Violent rain showers',
              95: 'Thunderstorm',
              96: 'Thunderstorm with slight hail',
              99: 'Thunderstorm with heavy hail',
            };
            return weatherDescriptions[code] || 'Unknown condition';
          };

          // Update weather state
          setWeather({
            temperature: data.current_weather.temperature,
            feelsLike: data.current_weather.apparent_temperature,
            high: data.daily.temperature_2m_max[0],
            low: data.daily.temperature_2m_min[0],
            condition: mapWeatherCodeToDescription(
              data.current_weather.weathercode
            ),
            humidity: '--', // Not available in Open-Meteo
            wind: data.current_weather.windspeed,
            precipitation: data.current_weather.precipitation || 0,
            forecast: data.daily.temperature_2m_max.map((temp, index) => ({
              day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
                (new Date().getDay() + index) % 7
              ],
              temp,
            })),
          });
        } catch (error) {
          console.error('Failed to fetch weather data', error);
        }
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div className="flex dark:bg-black w-full h-screen max-h-screen overflow-hidden">
      <Mainsidebar />
      <div className=" w-[100%] h-[100%] flex">
        <div className="flex-[0.7]  bg-gray-50 dark:bg-transparent flex flex-col justify-start items-start p-4 h-screen relative">
          <div className="flex mt-3 mx-auto items-center w-[80%] justify-between">
            <h1 className="text-black dark:text-white text-xl">
              Weekly Pinned
            </h1>
            <Button
              variant="ghost"
              className="text-yellow-400 dark:text-[#2647eb]"
            >
              view all
            </Button>
          </div>

          <div className="flex flex-col w-[80%] mt-4 mx-auto items-center">
            <div className="bg-white dark:bg-neutral-900 shadow-[0px_18px_50px_-10px_rgba(0,0,0,0.2)] justify-start items-start rounded-[12px] p-5 gap-4 w-full flex">
              <div className="h-10 w-10 p-2 justify-center items-center rounded-[10px] bg-yellow-400 dark:bg-[#2647eb]">
                <img
                  className="rounded-[50px] h-full w-full"
                  src="https://i.pinimg.com/564x/3a/66/4d/3a664df2b760904f1f15275059c75a3b.jpg"
                  alt=""
                />
              </div>
              <div className="justify-start items-start flex flex-col">
                <p className="text-black dark:text-white font-bold text-[18px]">
                  Call doctor for tests
                </p>
                <p className="text-gray-500 font-sans text-[14px] font-semibold">
                  31 oct 2024 - <span>9:00 AM</span>
                </p>
                <p className="text-white text-[14px] w-[50%] my-2 font-medium font-sans text-center bg-yellow-400 dark:bg-[#2647eb] rounded-2xl">
                  Personal
                </p>
                <p className="text-gray-400 font-medium font-sans text-[14px]">
                  ask for blood tests and gym <br /> certificate
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-950 mt-4 justify-start items-center rounded-[12px] p-3 gap-4 w-full flex">
              <div className="h-10 w-10 p-2 justify-center items-center rounded-[10px] bg-yellow-400 dark:bg-[#2647eb]">
                <Image
                  height={1000}
                  width={1000}
                  className="rounded-[50px] h-full w-full"
                  src="https://i.pinimg.com/564x/3a/66/4d/3a664df2b760904f1f15275059c75a3b.jpg"
                  alt=""
                />
              </div>
              <div className="justify-center text-center items-center gap-8 flex">
                <p className="text-black text-center font-sans dark:text-white font-bold text-[16px]">
                  Ishant's bday
                </p>
                <p className="text-gray-500 text-center font-sans text-[14px] font-semibold">
                  31 oct 2024
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-950 mt-4 justify-start items-center rounded-[12px] p-3 gap-4 w-full flex">
              <div className="h-10 w-10 p-2 justify-center items-center rounded-[10px] bg-yellow-400 dark:bg-[#2647eb]">
                <Plus className="w-full h-full" />
              </div>
              <div className="justify-center items-center gap-4 flex">
                <p className="text-black text-center font-sans dark:text-white font-bold text-[16px]">
                  Add new weekly pin
                </p>
              </div>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(day: Date | undefined) => setDate(day)}
              className="dark:bg-neutral-950 bg-white min-w-full rounded-[12px] mt-4 p-3 overflow-hidden h-[46%] max-h-[48%] items-center"
            />
          </div>
        </div>

        <div className="flex-[1] overflow-y-auto flex flex-col justify-start items-start p-4 h-screen scrollbar-thin">
          {isLoading ? (
            <div className="flex w-full h-full flex-col justify-center items-center gap-4">
              <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[450px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>
      </div>
      <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[450px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>
      </div>
      <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[450px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>
      </div>
      <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[450px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>
      </div>
      <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[450px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>
      </div>
      <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[450px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>
      </div>
      <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[450px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>
      </div>
      </div>
          ) : task.length > 0 ? (
            <DashboardTaskList task={task} setTask={setTask} />
          ) : (
            <div className="flex w-full h-full justify-center items-center">
              <TaskEmptyState />
            </div>
          )}
        </div>

        <div className="flex-[0.6] py-6 px-6 justify-center items-center flex flex-col h-full">
          <div className="flex px-8 justify-between items-center w-[90%]">
            
            <ThemeToggle />
              <UserAvatar />
          
          </div>

          <div className="w-[94%] px-4 flex flex-col justify-center items-center mt-2">
            <MusicProvider>
              <div className="w-full mt-1">
                <DashMusic />
              </div>
            </MusicProvider>

            <FloatingPanelRoot className="flex w-full shadow-md mt-4 justify-center items-start px-6 bg-gray-50 dark:bg-neutral-950 py-10 rounded-[14px] flex-col">
              
              <FloatingPanelTrigger
                title=""
                className="bg-transparent dark:bg-transparent border-none"
              >
                <div className="flex justify-end items-end text-gray-500 pb-4 -mr-8">
                  <p>{moment().format('LL')}</p>
                </div>
                <div className="flex justify-between gap-4 items-center pb-4">
                  <h1 className="lg:text-[32px] md:text-[24px] text-[16px]   font-sans font-semibold">
                    {time.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </h1>
                  <p className="bg-blue-100 text-blue-600 w-fit px-2 rounded-xl">
                    {weather.temperature}°C
                  </p>
                </div>
                <div className="text-[16px] flex text-left justify-start gap-1 items-start font-sans text-gray-700 dark:text-white font-semibold">
                  <span className="text-left flex justify-start gap-2 items-start">
                    <CloudSunIcon className="text-yellow-400 text-start" />
                  </span>
                  <div className="flex gap-4 justify-center items-center">
                    {' '}
                    <p className="font-medium">Feels like</p>{' '}
                    <span className="font-bold text-neutral-500">
                      {' '}
                      {(weather.condition || 'Loading...').slice(0, 11)}
                    </span>
                  </div>
                </div>
              </FloatingPanelTrigger>

             
              <FloatingPanelContent className="-mt-32 -ml-14 px-6 min-w-2xl border">
                
                <FloatingPanelHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Sun className="w-8 h-8 text-yellow-400 mr-2" />
                      <h1 className="font-bold text-lg pr-4">
                        Today's Weather
                      </h1>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      {weather.temperature}°C
                    </Badge>
                  </div>
                </FloatingPanelHeader>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-2xl font-bold">
                      {weather.temperature}°C
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Feels like {weather.feelsLike}°C
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{weather.condition}</p>
                    <FloatingPanelBody>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        High {weather.high}°C / Low {weather.low}°C
                      </p>
                    </FloatingPanelBody>
                  </div>
                </div>

                {/* 5-Day Forecast */}
                <div className="space-y-2">
                  <h4 className="font-medium">5-Day Forecast</h4>
                  {weather.forecast.map((day, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>{day.day}</span>
                      <div className="flex items-center">
                        <Sun className="w-4 h-4 text-yellow-400 mr-2" />
                        <span>{day.temp}°C</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <FloatingPanelFooter>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Last updated:{' '}
                    {time.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </FloatingPanelFooter>
              </FloatingPanelContent>
            </FloatingPanelRoot>

            <div className="flex w-full max-h-fit mt-4 shadow-md space-y-7 overflow-hidden justify-center items-start px-6 bg-gray-50 dark:bg-neutral-950 pt-4 rounded-[14px] flex-col">
              <h1 className="lg:text-[20px] md:text-[20px] text-[16px] leading-tight font-sans font-semibold">
                Unsleash <br /> the professional <br /> super power
              </h1>
              <p className="text-[14px]  font-semibold text-gray-400">
                Unlimited meetings, tasks, premium features and much more
              </p>
              <div className="flex items-end ">
                <Image
                  height={1000}
                  width={1000}
                  className="  h-28 justify-self-end -ml-3 w-auto"
                  src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1730377159/CONFERIO/ix8hjpuaaqftbagoekit.png"
                  alt=""
                />
                <FamilyButtonDemo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
