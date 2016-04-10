<?php
$pokedex = json_decode(file_get_contents('http://pokeapi.co/api/v1/pokemon/?limit=12'));

echo '<pre>';
print_r($pokedex);exit;