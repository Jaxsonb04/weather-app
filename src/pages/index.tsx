import { useEffect, useState } from 'react';
import { ConvertTempOptions } from 'typings';

import clsxm from '@/lib/clsxm';
import convertTemp from '@/lib/convertTemp';

import Border from '@/components/Border';
import Layout from '@/components/layout/Layout';
import WeatherMiniItem from '@/components/links/WeatherMiniItem';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import WeatherCard from '@/components/WeatherCard';
import WeatherItem from '@/components/WeatherItem';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.
const API_KEY =
  process.env.WEATHER_API_KEY || 'ff143cb7beae2ed6fd3bb63f9b8c0d3f';
//https://api.openweathermap.org/data/2.5/weather?q=texas&appid=ff143cb7beae2ed6fd3bb63f9b8c0d3f
const fetchWeather = async ({ city }) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  );
  const data = await res.json();
  return data;
};

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<any>();
  const [city, setCity] = useState('Taiwan'); // Default
  const [tempUnit, setTempUnit] = useState<ConvertTempOptions['to']>('C'); // Default

  /**
   * To check if the weather is loaded or the loding is complete
   * @default false
   */
  const isWeatherLoaded = !!weather && !loading; // Are you drunk? True: if you can't talk and you can't walk, else you're not.

  const getWeather = async ({ city }) => {
    const data = await fetchWeather({ city });
    setLoading(false);
    setWeather(data);
  };

  // Run this function when page load complete
  useEffect(() => {
    setLoading(true);
    getWeather({ city: city });
  }, []);

  console.log(city);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='relative z-[2] flex min-h-screen items-center justify-center'>
        <div className='absolute top-4 right-4 mt-2 flex items-center justify-center gap-0.5'>
          <button
            className={clsxm(
              'temp-button',
              tempUnit === 'C' ? 'temp-active' : 'temp-inactive'
            )}
            onClick={() => setTempUnit('C')}
          >
            C&deg;
          </button>
          <button
            className={clsxm(
              'temp-button',
              tempUnit === 'F' ? 'temp-active' : 'temp-inactive'
            )}
            onClick={() => setTempUnit('F')}
          >
            F&deg;
          </button>
        </div>
        <div className='grid max-w-2xl flex-1 grid-cols-2 gap-8 p-4'>
          <WeatherCard className='col-span-2 !p-0'>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await getWeather({
                  city,
                });
              }}
            >
              <input
                id='city'
                autoComplete='off'
                className='w-full border-none bg-transparent pl-2 text-2xl font-thin tracking-wide selection:bg-gray-900/30 selection:text-cyan-200 focus:outline-none focus:ring focus:ring-transparent dark:text-white sm:p-5 sm:pl-3'
                type='textbox'
                placeholder='Enter a city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </form>
          </WeatherCard>

          <WeatherCard>
            <div className='flex w-full justify-center dark:text-white'>
              {isWeatherLoaded ? (
                <NextImage
                  width={96}
                  height={96}
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className='h-24 w-24'
                  priority
                />
              ) : (
                <div className='h-24 w-24' />
              )}
            </div>
            <h1 className='text-center text-4xl font-bold'>
              {loading ? 'Loading...' : weather?.name}
            </h1>
            {isWeatherLoaded && (
              <div className='flex flex-col items-center'>
                <p className='mt-1 text-center text-sm font-thin uppercase tracking-widest'>
                  {weather.weather[0].description}
                </p>
                <div className='mt-8 flex flex-col items-center'>
                  <p className='text-center text-6xl font-thin'>
                    {convertTemp({ temp: weather.main.temp, to: tempUnit })}
                    <span className='font-thin'>&deg;</span>
                  </p>
                </div>
              </div>
            )}
          </WeatherCard>
          {isWeatherLoaded && (
            <WeatherCard className='grid grid-cols-2 grid-rows-2 place-content-center place-items-center gap-4'>
              <WeatherItem
                title='Visibility'
                value={(weather.visibility / 1000).toFixed(1)}
                unit='km'
              />
              <WeatherItem
                title='Wind'
                value={weather.wind.speed}
                unit='M/S • S'
              />
              <WeatherItem
                title='Sunrise'
                value={new Date(weather.sys.sunset * 1000)
                  .toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })
                  .replace('AM', '')
                  .replace('PM', '')}
                unit={
                  new Date(weather.sys.sunrise * 1000).getHours() < 12
                    ? 'AM'
                    : 'PM'
                }
              />
              <WeatherItem
                title='Sunrise'
                value={new Date(weather.sys.sunrise * 1000)
                  .toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })
                  .replace('AM', '')
                  .replace('PM', '')}
                unit={
                  new Date(weather.sys.sunset * 1000).getHours() < 12
                    ? 'AM'
                    : 'PM'
                }
              />
            </WeatherCard>
          )}

          {isWeatherLoaded && (
            <WeatherCard className='col-span-2 flex items-center justify-between'>
              <WeatherMiniItem
                value={`${convertTemp({
                  temp: weather.main.feels_like,
                  to: tempUnit,
                })}`}
                unit='°'
                title='FEELS LIKE'
              />
              <Border />
              <WeatherMiniItem
                value={`${convertTemp({
                  temp: weather.main.temp_min,
                  to: tempUnit,
                })}`}
                unit='°'
                title='MIN TEMP'
              />
              <Border />
              <WeatherMiniItem
                value={`${convertTemp({
                  temp: weather.main.temp_max,
                  to: tempUnit,
                })}`}
                unit='°'
                title='max temp'
              />
              <Border />
              <WeatherMiniItem
                value={`${weather.main.pressure}`}
                unit='hpa'
                title='pressure'
              />
              <Border />
              <WeatherMiniItem
                value={`${weather.main.humidity}`}
                unit='%'
                title='humidity'
              />
            </WeatherCard>
          )}
        </div>
      </main>
      <div className='fixed inset-0 z-[1] backdrop-blur-2xl' />
    </Layout>
  );
}
