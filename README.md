Vleet engine
============
> Engine for Vleet (Virtual Fleet) simulator for AirVantage


## Usage

### Environnement

1. Install Nodejs
2. Clone this repository
3. Install the dependencies: `npm install` from the root folder

### Configure your simulation
Have a look at [config/simulations/trucks.json.template](config/simulations/trucks.json.template) file to create your own.

Let's say you want to simulate an alarm system, create a `alarmSystem.json` file in [config/simulations](config/simulations) folder. The name of the file will be used to reference your simulation.

#### Need a custom data generator? 

Add them in [custom-generators](custom-generators) folder.

### Final setup

1. Create a `setup.json` out of the [setup.json.template](setup.json.template) file.
2. Provide the name of the simulation you want to run (name of the you created in [config/simulations](config/simulations))
3. Select the AirVantage DataCenter you target: `eu` or `na`
4. Provide your (or a technical user) credentials on the selected AirVantage DataCenter.

### Launch your simulation

From the root folder just launch `npm start`
  
