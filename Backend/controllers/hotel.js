import Hotel from '../models/Hotel.js';
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        // next() to go to the next middleware
        // (next used if the this middleware doesn't end req/res cycle)
        next(error) 
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // return the updated doc
        )
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(
            req.params.id,
        )
        res.status(200).json("Hotel deleted successfully")
    } catch (error) {
        next(error)
    }
}

export const getHotelById = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(
            req.params.id,
        )
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}

export const getHotels = async (req, res, next) => {
    const {min, max, limit, ...others} = req.query
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: {$gt: min || 0, $lt: max || 1000000},
        }).limit(Number(limit))
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}

export const countBycity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        //Promise.all to handle loop of promises
        const citiesCounts = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city: city})
        }))
        res.status(200).json(citiesCounts)
    } catch (error) {
        next(error)
    }
}

export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
};

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const rooms = await Promise.all(
            hotel.rooms.map(roomId => Room.findById(roomId))
        )
        res.status(200).json(rooms)
    } catch (error) {
        next(error);
    }
}