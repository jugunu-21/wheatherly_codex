import React from 'react';
import ToggleButton from '../ToggleButton';

interface WeatherInfoProps {
  temperature: number;
  conditionText: string;
  conditionIcon: string;
  isCelsius: boolean;
  onToggleUnit: () => void;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  temperature,
  conditionText,
  conditionIcon,
  isCelsius,
  onToggleUnit
}) => {
  return (
    <div className="text-right">
      <div className="flex items-center justify-end mb-2">
        <ToggleButton
          isActive={isCelsius}
          onToggle={onToggleUnit}
          leftLabel="°C"
          rightLabel="°F"
        />
      </div>
      <p className="text-6xl font-light">{Math.round(temperature)}°{isCelsius ? 'C' : 'F'}</p>
      <div className="flex items-center justify-end mt-2">
        <img 
          src={conditionIcon} 
          alt={conditionText}
          className="w-8 h-8"
        />
        <p className="ml-2 text-sm">{conditionText}</p>
      </div>
    </div>
  );
};

export default WeatherInfo;