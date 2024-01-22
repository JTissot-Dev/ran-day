<?php

namespace App\Services;

class OsmService
{
    private $overpassApiUrl;

    public function __construct()
    {
        $this->overpassApiUrl = env('OVERPASS_API_URL');
    } 

    private function executeOverpassQuery(String $query)
        {
            // Configuration de la requête cURL
            $ch = curl_init($this->overpassApiUrl);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, "data=" . urlencode($query));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            // Exécution de la requête
            $response = curl_exec($ch);

            // Gestion des erreurs
            if (curl_errno($ch)) {
                  info(curl_error($ch));
            }

            // Fermeture de la ressource cURL
            curl_close($ch);

            // Traitement de la réponse
            $data = json_decode($response, true);
            return $data['elements'];
        }
    
    private function getPlace(String $city, String $placeCategory, String $placeType)
    {
        $query = "
        [out:json];
        area[name='$city'];
        nwr[$placeCategory='$placeType'](area);
        out center;
        ";

        $places = $this->executeOverpassQuery($query);

        $formatedPlaces = array_map(function($place) {
            return [
                'id' => $place['id'],
                'name' => isset($place['tags']['name']) ? 
                          $place['tags']['name'] : 
                          'Lieu mystère',
                'latitude' =>  isset($place['lat']) ? 
                          $place['lat'] : 
                          $place['center']['lat'],
                'longitude' =>  isset($place['lon']) ? 
                          $place['lon'] : 
                          $place['center']['lon'],
            ];
        }, $places);
        return $formatedPlaces;
      }

      private function getRandomPlace(Array $places)
      {
          $randomPlace = count($places) > 0 ? 
              $places[rand(0, count($places) - 1)] : 
              [];
          return $randomPlace;
      }

      public function getProgram(String $city, $program)
      {
        // get all places by type
        $cafes = $this->getPlace($city,'amenity', 'cafe');
        $restaurants = $this->getPlace($city,'amenity', 'restaurant');
        $cinemas = $this->getPlace($city,'amenity', 'cinema');
        $nightclubs = $this->getPlace($city,'amenity', 'nightclub');
        $casinos = $this->getPlace($city,'amenity', 'casino');
        $bars = $this->getPlace($city,'amenity', 'bar');
        $pubs = $this->getPlace($city,'amenity', 'pub');
        $iceCreams = $this->getPlace($city,'amenity', 'ice_cream');
        $museums = $this->getPlace($city,'tourism', 'museum');
        $viewPoints = $this->getPlace($city,'tourism', 'viewpoint');
        $artworks = $this->getPlace($city,'tourism', 'artwork');
        $attractions = $this->getPlace($city, 'tourism', 'attraction');
        $amusmentArcades = $this->getPlace($city, 'leisure', 'amusement_arcade');
        $bathingPlaces = $this->getPlace($city, 'leisure', 'bathing_place');
        $natureReserves = $this->getPlace($city, 'leisure', 'nature_reserve');
        $parks = $this->getPlace($city, 'leisure', 'park');
        $beachResorts = $this->getPlace($city, 'leisure', 'beach_resort');
        $fastFoods = $this->getPlace($city, 'amenity', 'fast_food');


        // get random place
        $cafe = $this->getRandomPlace($cafes);
        $restaurant = $this->getRandomPlace($restaurants);
        $cinema = $this->getRandomPlace($cinemas);
        $nightclub = $this->getRandomPlace($nightclubs);  
        $casino = $this->getRandomPlace($casinos);
        $bar = $this->getRandomPlace($bars);
        $pub = $this->getRandomPlace($pubs);
        $iceCream = $this->getRandomPlace($iceCreams);
        $museum = $this->getRandomPlace($museums);
        $viewPoint = $this->getRandomPlace($viewPoints);
        $artwork = $this->getRandomPlace($artworks);
        $attraction = $this->getRandomPlace($attractions);
        $amusmentArcade = $this->getRandomPlace($amusmentArcades);
        $bathingPlace = $this->getRandomPlace($bathingPlaces);
        $natureReserve = $this->getRandomPlace($natureReserves);
        $park = $this->getRandomPlace($parks);
        $beachResort = $this->getRandomPlace($beachResorts);
        $fastFood = $this->getRandomPlace($fastFoods);


        $classicProgram1 = [
            array_merge(['type' => 'coffee'], $cafe),
            array_merge(['type' => 'attraction'], $attraction),
            array_merge(['type' => 'restaurant'], $restaurant),
            array_merge(['type' => 'museum'], $museum),
            array_merge(['type' => 'bar'], $bar)
        ];
        
        $classicProgram2 = [
            array_merge(['type' => 'coffee'], $cafe),
            array_merge(['type' => 'attraction'], $attraction),
            array_merge(['type' => 'restaurant'], $restaurant),
            array_merge(['type' => 'park'], $park),
            array_merge(['type' => 'cinema'], $cinema)
        ];
        
        $classicProgram3 = [
            array_merge(['type' => 'coffee'], $cafe),
            array_merge(['type' => 'attraction'], $attraction),
            array_merge(['type' => 'amusementArcade'], $amusmentArcade),
            array_merge(['type' => 'iceCream'], $iceCream),
            array_merge(['type' => 'restaurant'], $restaurant)
        ];
        
        $outdoorProgram1 = [
            array_merge(['type' => 'natureReserve'], $natureReserve),
            array_merge(['type' => 'viewPoint'], $viewPoint),
            array_merge(['type' => 'bathingPlace'], $bathingPlace),
        ];
        
        $outdoorProgram2 = [
            array_merge(['type' => 'park'], $park),
            array_merge(['type' => 'viewPoint'], $viewPoint),
            array_merge(['type' => 'beachResort'], $beachResort),
        ];
        
        $partyProgram = [
            array_merge(['type' => 'coffee'], $cafe),
            array_merge(['type' => 'bar'], $bar),
            array_merge(['type' => 'casino'], $casino),
            array_merge(['type' => 'fastFood'], $fastFood),
            array_merge(['type' => 'pub'], $pub),
            array_merge(['type' => 'nightclub'], $nightclub)
        ];
        
        $cultureProgram = [
            array_merge(['type' => 'coffee'], $cafe),
            array_merge(['type' => 'artwork'], $artwork),
            array_merge(['type' => 'museum'], $museum),
            array_merge(['type' => 'attraction'], $attraction),
            array_merge(['type' => 'cinema'], $cinema),
        ];

        $classicPrograms = [
            $classicProgram1,
            $classicProgram2,
            $classicProgram3,
        ];

        $outdoorPrograms = [
            $outdoorProgram1,
            $outdoorProgram2,
        ];


        if ($program == 'classic-program') {
          return $this->getRandomPlace($classicPrograms);
        }
        if ($program == 'outdoor-program') {
            return $this->getRandomPlace($outdoorPrograms);
        }
        if ($program == 'party-program') {
          return $partyProgram;
        }
        if ($program == 'culture-program') {
          return $cultureProgram;
        }
    }
}