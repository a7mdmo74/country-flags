import { CountryType } from '@/lib/typing';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  country: CountryType;
};

const Country = ({ country }: Props) => {
  return (
    <Link
      href={`/country/${country.name.common}`}
      className="bg-white shadow-md rounded-lg overflow-hidden"
    >
      <Image
        src={country.flags.png}
        alt={country.name.common}
        className="w-full h-48 object-cover"
        width={800}
        height={500}
      />
      <div className="p-6 space-y-3">
        <h2 className="text-2xl font-bold text-gray-800 hover:text-gray-700 transition-colors">
          {country.name.common}
        </h2>
        <div className="space-y-2">
          <p className="text-gray-600 flex items-center">
            <span className="font-semibold mr-2">Capital:</span>
            {country.capital}
          </p>
          <p className="text-gray-600 flex items-center">
            <span className="font-semibold mr-2">Region:</span>
            {country.region}
          </p>
          <p className="text-gray-600 flex items-center">
            <span className="font-semibold mr-2">Population:</span>
            {country.population
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
        </div>
      </div>{' '}
    </Link>
  );
};

export default Country;
