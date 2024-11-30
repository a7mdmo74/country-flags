import { getAllCountries } from '@/lib/requests';
import { CountryType } from '@/lib/typing';
import Image from 'next/image';
import Link from 'next/link';

export default async function CountryPage({
  params,
}: {
  params: Promise<{ countryName: string }>;
}) {
  const countryName = (await params).countryName;
  const countries = await getAllCountries();
  const country = countries.find(
    (country: CountryType) =>
      country.name.common === decodeURIComponent(countryName)
  );

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Country not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-1 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-8 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-md"
        >
          ← Back to Home
        </Link>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src={country.flags.svg}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-2">
                {country.name.common}
              </h1>
              <p className="text-xl text-gray-600">{country.name.official}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Basic Information
                  </h2>
                  <div className="space-y-3">
                    <p className="flex justify-between">
                      <span className="font-semibold">Population:</span>
                      <span>{country.population.toLocaleString()}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Region:</span>
                      <span>{country.region}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Sub Region:</span>
                      <span>{country.subregion}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Capital:</span>
                      <span>{country.capital?.[0]}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Area:</span>
                      <span>{country.area.toLocaleString()} km²</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Additional Details
                  </h2>
                  <div className="space-y-3">
                    <p className="flex justify-between">
                      <span className="font-semibold">Languages:</span>
                      <span className="text-right">
                        {Object.values(country.languages || {}).join(', ')}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Currencies:</span>
                      <span className="text-right">
                        {Object.values(country.currencies || {})
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          .map((curr: any) => curr.name)
                          .join(', ')}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Timezone:</span>
                      <span className="text-right">
                        {country.timezones?.join(', ')}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Borders:</span>
                      <span className="text-right">
                        {country.borders?.join(', ') ||
                          'No bordering countries'}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Status</h2>
                  <div className="space-y-3">
                    <p className="flex justify-between">
                      <span className="font-semibold">Independent:</span>
                      <span>{country.independent ? 'Yes' : 'No'}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">UN Member:</span>
                      <span>{country.unMember ? 'Yes' : 'No'}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {country.maps.googleMaps && (
                <a
                  href={country.maps.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                  View on Google Maps
                </a>
              )}
              {country.maps.openStreetMaps && (
                <a
                  href={country.maps.openStreetMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
                >
                  View on OpenStreetMap
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
