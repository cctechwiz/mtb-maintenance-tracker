import { Suspense } from "react";
import { db, User, PartCategory, PartType } from "./model.js";
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

Brakes:   (should I add functionality for mechanical brakes)
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

Groupset:   (should I add functionality for e-mtb bikes)
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
      --- tube (not added yet)
    if tubeless:
      --- valve stem
      --- sealant
    -- valve core
    -- front axle
  - rear wheel
    -- rim
    -- hub
    -- spokes
    if tubes:
      --- tube (not added yet)
    if tubeless:
      --- valve stem
      --- sealant
    -- valve core
    -- freehub
    -- rear axle
*/

const partCategories = ['frame', 'fork', 'suspension', 'cockpit', 'brakes', 'groupset', 'wheels'];

const partsTypes = { 
  frame: ['frame', 'bottom_bracket', 'headset', 'derailleur_hanger'],
  fork: ['fork'],
  suspension: ['shock', 'linkage_bearings'],
  cockpit: ['stem', 'handlebars', 'grips', 'saddle', 'seatpost', 'dropper_lever', 'pedals'],
  brakes: ['front_lever', 'rear_lever', 'front_brake_line', 'rear_brake_line', 'front_caliper', 'rear_caliper', 'front_rotor', 'rear_rotor'],
  groupset: ['shifter', 'housing_and_cable', 'derailleur', 'crank', 'chainring', 'chain'],
  wheels: ['front_rim', 'rear_rim', 'front_hub', 'rear_hub', 'front_spokes', 'rear_spokes', 'front_tire', 'rear_tire', 'front_valve_stem', 'rear_valve_stem', 'front_sealant', 'rear_sealant', 'front_valve_core', 'rear_valve_core', 'front_axle', 'rear_axle']
};

for (const [key, value] of Object.entries(partsTypes)) {
  const newCategory = await PartCategory.create({
    name: key
  });

  for (const part of value) {
    await PartType.create({
      name: part,
      categoryId: newCategory.id
    })
  }
};

await db.close();