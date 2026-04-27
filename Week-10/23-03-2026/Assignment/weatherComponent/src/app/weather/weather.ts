import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface WeatherData {
  name: string;
  temperature: string;
  wind: string;
  humidity: string;
}

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.html',
  styleUrls: ['./weather.css'],
  imports: [CommonModule]
})
export class Weather {
  // Accepts the array of weather objects
  myCityData: WeatherData[] = [
    { name: 'Seattle', temperature: '60°F', wind: '5 mph', humidity: '70%' },
    { name: 'London', temperature: '15°C', wind: '10 mph', humidity: '80%' },
    { name: 'Tokyo', temperature: '22°C', wind: '8 mph', humidity: '65%' },
    { name: 'Mumbai', temperature: '32°C', wind: '12 mph', humidity: '85%' }
  ];
  
  searchInput: string = '';
  currentWeather: WeatherData | undefined;

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchInput = target.value;

    // Only search if the input is not empty
    if (this.searchInput.trim() !== '') {
      const searchLower = this.searchInput.toLowerCase();
      this.currentWeather = this.myCityData.find(
        (data) => data.name.toLowerCase() === searchLower
      );
    } else {
      // Reset when input is cleared
      this.currentWeather = undefined; 
    }
  }
}