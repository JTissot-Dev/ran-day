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
    
    private function getPlace(String $city,String $placeCategory, String $placeType)
    {
        $query = "
        [out:json];
        area[name='$city'];
        nwr[$placeCategory='$placeType'](area);
        out center;
        ";

        $places = $this->executeOverpassQuery($query);

        return $places;
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
            ['type' => 'coffee', 'data' => $cafe],
            ['type' => 'attraction', 'data' => $attraction],
            ['type' => 'restaurant', 'data' => $restaurant],
            ['type' => 'museum', 'data' => $museum],
            ['type' => 'bar', 'data' => $bar]
        ];

        $classicProgram2 = [
            ['type' => 'coffee', 'data' => $cafe],
            ['type' => 'attraction', 'data' => $attraction],
            ['type' => 'restaurant', 'data' => $restaurant],
            ['type' => 'park', 'data' => $park],
            ['type' => 'cinema', 'data' => $cinema]
        ];

        $classicProgram3 = [
            ['type' => 'coffee', 'data' => $cafe],
            ['type' => 'attraction', 'data' => $attraction],
            ['type' => 'amusementArcade', 'data' => $amusmentArcade],
            ['type' => 'iceCream', 'data' => $iceCream],
            ['type' => 'restaurant', 'data' => $restaurant]
        ];

        $outdoorProgram1 = [
            ['type' => 'natureReserve', 'data' => $natureReserve],
            ['type' => 'viewPoint', 'data' => $viewPoint],
            ['type' => 'bathingPlace', 'data' => $bathingPlace],
        ];

        $outdoorProgram2 = [
            ['type' => 'park', 'data' => $natureReserve],
            ['type' => 'viewPoint', 'data' => $viewPoint],
            ['type' => 'beachResort', 'data' => $beachResort],
        ];

        $partyProgram = [
            ['type' => 'coffee', 'data' => $cafe],
            ['type' => 'bar', 'data' => $bar],
            ['type' => 'casino', 'data' => $casino],
            ['type' => 'fastFood', 'data' => $fastFood],
            ['type' => 'pub', 'data' => $pub],
            ['type' => 'nightclub', 'data' => $nightclub]
        ];

        $cultureProgram = [
            ['type' => 'coffee', 'data' => $cafe],
            ['type' => 'artwork', 'data' => $artwork],
            ['type' => 'museum', 'data' => $museum],
            ['type' => 'attraction', 'data' => $attraction],
            ['type' => 'cinema', 'data' => $cinema],
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