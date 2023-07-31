import express from 'express';
import { verifyAdmin } from './../utils/verifyToken.js';
import {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotelById,
    getHotels,
    countBycity,
    countByType,
    getHotelRooms

} from './../controllers/hotel.js';

const router = express.Router()

//CREATE
router.post('/', verifyAdmin, createHotel)

// GET ALL
router.get('/', getHotels)

router.get('/countByCity', countBycity)

router.get('/countByType', countByType)

//UPDATE
router.put('/:id', verifyAdmin, updateHotel)
//DELETE
router.delete('/:id', verifyAdmin, deleteHotel)
//GET
router.get('/:id', getHotelById)
router.get("/room/:id", getHotelRooms);

export default router