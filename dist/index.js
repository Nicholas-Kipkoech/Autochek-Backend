"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const axios = require("axios");
const app = express();
app.get('/ids', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        let response = yield axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
        let data = response.data;
        const sliced = data.slice(0, 25);
        let result;
        let b = [];
        for (const element of sliced) {
            // @ts-ignore
            let data = yield axios.get(`https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`);
            result = data.data;
            console.log(result);
            b.push(result);
        }
        let titles = b.map(items => items.title);
        let arr = titles.toString().split(' ');
        let num = 10;
        const mostFrequent = (arr = [], num = 1) => {
            const map = {};
            let keys = [];
            for (let i = 0; i < arr.length; i++) {
                if (map[arr[i]]) {
                    map[arr[i]]++;
                }
                else {
                    map[arr[i]] = 1;
                }
            }
            for (let i in map) {
                keys.push(i);
            }
            keys = keys.sort((a, b) => {
                if (map[a] === map[b]) {
                    if (a > b) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                else {
                    return map[b] - map[a];
                }
            })
                .slice(0, num);
            return keys;
        };
        return res.json(mostFrequent(arr, num));
    }
    catch (err) {
        console.log(err.message);
    }
}));
const port = 5500;
app.listen(port, () => console.log('api running on 5500'));
