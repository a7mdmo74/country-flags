import Country from '@/components/Country';
import { getAllCountries } from '@/lib/requests';
import { CountryType } from '@/lib/typing';

export default async function Home() {
  const countries = (await getAllCountries()).filter(
    (country: CountryType) => country.name.common !== 'Israel'
  );
  return (
    <div>
      {/* add title */}
      <div className="text-center mt-24">
        <h1 className="text-4xl font-bold text-gray-900">Countries</h1>
      </div>
      <div className="max-w-7xl mx-auto mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {countries.map((country: CountryType) => (
            <Country key={country.name.common} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
}
