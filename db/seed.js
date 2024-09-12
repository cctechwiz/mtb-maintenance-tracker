import { Suspense } from "react";
import { db, User } from "./model.js";
import bcryptjs from 'bcryptjs';

await db.sync({ force: true });

const users = ['user1@test.com']

const hashedPassword = bcryptjs.hashSync('test', bcryptjs.genSaltSync(10));

for (const user of users) {
  await User.create({
    email: user.toLowerCase(),
    password: hashedPassword
  })
}

/*
Part Hierarchy

Frame:
  - frame
  - bottom bracket
  - headset
  - derailleur hanger

Fork:
  - fork

Suspension:
  - shock
  - linkage bearings (or busings)

Cockpit:
  - stem
  - handlebars
  - grips
  - saddle
  - seatpost
  - dropper post lever
  - pedals (is this in the right category?)

Brakes:
(do these need to be separate? how do you differentiate between a service on one vs the other?)
  - front brakes:
    -- levers
    -- lines (should this be included with levers?)
    -- calipers
    -- rotors
  - rear brakes:
    -- levers
    -- lines (should this be included with levers?)
    -- calipers
    -- rotors

Groupset:
  - shifter(s)
  - if mechanical:
    -- housing and cable(s)
  - if wireless:
    -- battery
  - derailleur(s)
  - crank
  - chainring
  - chain

Wheels:
  - front wheel
    -- rim
    -- hub
    -- spokes
    -- tire
    if tubes:
      --- tube
    if tubeless:
      --- valve stem
      --- sealant
    -- valve core
    -- front axel
  - rear wheel
    -- rim
    -- hub
    -- spokes
    if tubes:
      --- tube
    if tubeless:
      --- valve stem
      --- sealant
    -- valve core
    -- freehub
    -- rear axel
*/

const partTypes = ['frame', 'fork', 'suspension', 'cockpit', 'brakes', 'groupset', 'wheels']

const parts = { 
  frame: ['frame', 'bottomBracket', 'headset', 'derailleurHanger'],
  fork: ['fork'],
  suspension: ['shock', 'linkageBearings'],
  cockpit: ['stem', 'handlebars', 'grips', 'saddle', 'seatpost', 'dropperLever', 'pedals'],
  brakes: ['frontLever', 'rearLever', 'frontBrakeLine', 'rearBrakeLine', 'frontCaliper', 'rearCaliper', 'frontRotor', 'rearRotor'],
  groupset: [],
  wheels: []
}

await db.close();