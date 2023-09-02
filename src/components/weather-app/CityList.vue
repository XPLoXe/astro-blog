<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)"> </CityCard>
  </div>

  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import CityCard from './CityCard.vue'
import { useRouter } from 'vue-router'

const savedCities = ref([])

// Define an asynchronous function to get weather data for saved cities.
const getCities = async () => {
  // Try to get saved cities from local storage.
  const localStorageCities = localStorage.getItem('savedCities')

  // If there are saved cities in local storage:
  if (localStorageCities) {
    // Parse the local storage data to JSON and set it to 'savedCities' ref.
    savedCities.value = JSON.parse(localStorageCities)

    // Initialize an empty array to store multiple Axios requests.
    const requests = []

    // Loop through each saved city to create an Axios request.
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`
        )
      )
    })

    // Use Promise.all to perform all the Axios requests concurrently and await their results.
    const weatherData = await Promise.all(requests)

    // Flicker Delay
    await new Promise((res) => setTimeout(res, 500))

    // Update the saved cities with the corresponding weather data.
    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data
    })
  }
}

//This component will have to be called with a <Suspense> tag
await getCities()

//On clicking the card, we'll be redirected to the CityView
const router = useRouter()
const goToCityView = (city) => {
  router.push({
    name: 'cityView',
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng
    }
  })
}
</script>
