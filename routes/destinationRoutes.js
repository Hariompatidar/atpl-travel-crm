const express = require("express");
const {
    addNewDestination,
    getDestinations,
    updateDestination,
    deleteDestination,
} = require("../controllers/destinationController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router
    .route("/destination")
    .post(isAuthenticatedUser, authorizeRoles("admin"),addNewDestination)
    .get(getDestinations)
    .put(isAuthenticatedUser, authorizeRoles("admin"),updateDestination)
    .delete(isAuthenticatedUser, authorizeRoles("admin"),deleteDestination);


module.exports= router;