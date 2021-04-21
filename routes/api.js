const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");

router.get("/api/workouts", ({ body }, res) => {
  Workout.aggregate({$addFields: {totalDuration: {$sum: '$exercises.duration'}}})
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", ({ body }, res) => {
  Workout.aggregate({$addFields: {workoutTotal: {$sum: '$exercises.weight'}}})
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workout/:id", (req, res) => {
  Workout.findOneAndUpdate({ _id: req.params.id }, req.body )
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .sort({ day: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html" ));
});


module.exports = router;
