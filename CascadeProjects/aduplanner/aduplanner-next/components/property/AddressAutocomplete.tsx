'use client';

import { useState, type FC, useCallback } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import type { LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { MagnifyingGlassIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { analyzePropertyByAddress } from '@/lib/propertyAnalysis';

interface AddressAutocompleteProps {
  onSelect?: (location: LatLngLiteral, address: string, placeDetails: google.maps.places.PlaceResult) => void;
}

const AddressAutocomplete: FC<AddressAutocompleteProps> = ({ onSelect }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [propertyAnalysis, setPropertyAnalysis] = useState<any>(null);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    debounce: 300,
    cache: 86400,
    requestOptions: {
      types: ['address'],
      componentRestrictions: { country: 'us' }
    }
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setShowSuggestions(true);
    setPropertyAnalysis(null);
  };

  const handleSelect = useCallback(async (suggestion: { description: string, place_id: string }) => {
    setIsSearching(true);
    setValue(suggestion.description, false);
    clearSuggestions();
    setShowSuggestions(false);

    try {
      // Get geocode data
      const results = await getGeocode({ placeId: suggestion.place_id });
      const { lat, lng } = await getLatLng(results[0]);

      // Get detailed place information
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      
      service.getDetails(
        {
          placeId: suggestion.place_id,
          fields: ['address_components', 'types', 'name', 'formatted_address']
        },
        async (placeResult, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && placeResult) {
            const analysis = await analyzePropertyByAddress(suggestion.description);
            setPropertyAnalysis(analysis);
            onSelect?.({ lat, lng }, suggestion.description, placeResult);
          } else {
            toast.error('Error getting property details. Please try again.');
          }
          setIsSearching(false);
        }
      );
    } catch (error) {
      console.error('Error selecting address:', error);
      toast.error('Error selecting address. Please try again.');
      setIsSearching(false);
    }
  }, [onSelect, setValue, clearSuggestions]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter your property address..."
          className="w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          onFocus={() => setShowSuggestions(true)}
        />
        <MagnifyingGlassIcon className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
      </div>

      {showSuggestions && status === "OK" && (
        <ul className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-xl border border-gray-200">
          {data.map(suggestion => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-900 text-lg border-b border-gray-100 last:border-b-0"
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}

      {propertyAnalysis && !showSuggestions && (
        <div className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-xl border border-gray-200 p-4">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Property Analysis</h3>
            <LightBulbIcon className={`w-6 h-6 ${
              propertyAnalysis.isEligible ? 'text-green-500' : 'text-red-500'
            }`} />
          </div>
          
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-medium text-gray-700">Zoning</h4>
              <p className="text-sm text-gray-600">{propertyAnalysis.zoning}</p>
            </div>

            {propertyAnalysis.isEligible ? (
              <>
                <div>
                  <h4 className="font-medium text-gray-700">Maximum ADU Size</h4>
                  <p className="text-sm text-gray-600">{propertyAnalysis.maxSize} sq m</p>
                </div>

                {propertyAnalysis.restrictions.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700">Restrictions</h4>
                    <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                      {propertyAnalysis.restrictions.map((restriction: string, index: number) => (
                        <li key={index}>{restriction}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div>
                <h4 className="font-medium text-red-600">Not Eligible for ADU</h4>
                <p className="text-sm text-gray-600">{propertyAnalysis.ineligibilityReason}</p>
              </div>
            )}

            {propertyAnalysis.disclaimers.length > 0 && (
              <div className="text-xs text-gray-500 border-t pt-2 mt-2">
                {propertyAnalysis.disclaimers.map((disclaimer: string, index: number) => (
                  <p key={index} className="mt-1">{disclaimer}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {isSearching && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;
