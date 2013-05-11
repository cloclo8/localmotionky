Mongoid.load!("config/mongoid.yml")

class FoodServiceLocation
  include Mongoid::Document
  store_in collection: "FoodServiceLocation"
end

class ParksData
  include Mongoid::Document
  store_in collection: "ParksData"
end
