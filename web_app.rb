require 'bundler'
Bundler.require
require 'open-uri'
require './models'

configure do
  enable :sessions
  set :session_secret, rand(36**10).to_s(36)
  set :raise_errors, false
  set :show_exceptions, false
end

assets do
  css :application, '/static/min.css', [
    '/zurb-foundation-4.0.3/css/normalize.css',
    '/zurb-foundation-4.0.3/css/foundation.css',
    '/leaflet-0.5.1/leaflet.css',
    '/Leaflet.markercluster/MarkerCluster.css',
    '/Leaflet.markercluster/MarkerCluster.Default.css',
    '/bradvin-FooTable-master/css/footable-0.1.css',
    '/stefanocudini-leaflet-search/leaflet-search.css',
    '/app/main.css'
  ]

  js :application, '/static/min.js', [
    '/zurb-foundation-4.0.3/js/vendor/custom.modernizr.js',
    '/leaflet-0.5.1/leaflet.js',
    '/Leaflet.markercluster/leaflet.markercluster-src.js',
    '/bradvin-FooTable-master/js/footable-0.1.js',
    '/bradvin-FooTable-master/js/footable.sortable.js',
    '/stefanocudini-leaflet-search/leaflet-search.js',
    '/app/main.js'
  ]

  js :foundation_all, '/static/foundation_all.min.js', [
    "/zurb-foundation-4.0.3/js/foundation.min.js",
    "/zurb-foundation-4.0.3/js/foundation/foundation.js",
    "/zurb-foundation-4.0.3/js/foundation/foundation.alerts.js",
    "/zurb-foundation-4.0.3/js/foundation/foundation.clearing.js",
    "/zurb-foundation-4.0.3/js/foundation/foundation.cookie.js",
    "/zurb-foundation-4.0.3/js/foundation/foundation.dropdown.js",
    "/zurb-foundation-4.0.3/js/foundation/foundation.forms.js",
    "/zurb-foundation-4.0.3/js/foundation/foundation.joyride.js",
    "/zurb-foundation-4.0.3/js/foundation/foundation.magellan.js",
    "/zurb-foundation-4.0.3/js/foundation/foundation.orbit.js",
    "/zurb-foundation-4.0.3/js/foundation/foundation.placeholder.js",
    "/zurb-foundation-4.0.3/js/foundation/foundation.reveal.js",
    "/zurb-foundation-4.0.3/js/foundation/foundation.section.js",
    "/zurb-foundation-4.0.3/js/foundation/foundation.tooltips.js",
    "/zurb-foundation-4.0.3/js/foundation/foundation.topbar.js"
  ]

end

configure :development do
  PUBLIC_HOST = ""
end

configure :production do
  # PUBLIC_HOST = "http://cf.hitech.socialhealthinsights.com"
  PUBLIC_HOST = ""
end

get '/' do
  if settings.production? # static asset from AWS S3/CF
    @default_data_url = '/data/data-cached.json'
  else
    @default_data_url = '/data.json'
  end
  haml :main
end

get '/data.json' do
  content_type :json
  geojson = Hash.new
  geojson["type"] = "FeatureCollection"
  food = FoodServiceLocation.where(:TypeDescription => "FOOD SERVICE").map do |p|
    {"type" => "Feature", "id" => "f"+p["EstablishmentID"].to_s, "properties" => p, "geometry" => {"type" => "Point", "coordinates" => [p["Longitude"],p["Latitude"]]}}
  end

  park = ParksData.all.map do |p|
    {"type" => "Feature", "id" => "p"+p["ParkID"].to_s, "properties" => p, "geometry" => {"type" => "Point", "coordinates" => [p["Longitude"],p["Latitude"]]}}
  end

  geojson["features"] = food+park
  return geojson.to_json
end
