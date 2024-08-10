#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
//currency  converter Api LINK
let apilink =
  "https://v6.exchangerate-api.com/v6/0164de67659d2de3b876b3b7/latest/PKR";

//fetching Data
let fetchData = async (data: any) => {
  let fetchData = await fetch(data);
  let res = await fetchData.json();
  return res.conversion_rates;
};

let data = await fetchData(apilink);
//object to array
let countries = Object.keys(data);

// user input  first country
let firstCountry = await inquirer.prompt({
  type: "list",
  name: "name",
  message: "Converting from",
  choices: countries,
});

//first country money
let userMoney = await inquirer.prompt({
  type: "number",
  name: "Money",
  message: `please enter the amount in ${chalk.greenBright.bold(
    firstCountry.name
  )}:`,
});

//convert country
let secondCountry = await inquirer.prompt({
  type: "list",
  name: "name",
  message: "Converting To",
  choices: countries,
});

//conversion rate
let cnv = `https://v6.exchangerate-api.com/v6/0164de67659d2de3b876b3b7/pair/${firstCountry.name}/${secondCountry.name}`;

//fetching data for conversion rate
let cnvData = async (data: any) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
  };

  let conversionRate = await cnvData (cnv);

  let convertedRate = userMoney.Money * conversionRate;

  console.log(`your ${chalk.bold.greenBright(firstCountry.name)} ${chalk.bold.greenBright(userMoney.Money)} in ${chalk.bold.greenBright(secondCountry.name)} is ${chalk.bold.greenBright(convertedRate)}`);