import axios from "axios";

export default class TechTrendsApi {
    apiInstance = axios.create({
        baseURL: '/',
        timeout: 5000,
    });

    constructor() {
        this.apiInstance.interceptors.response.use(function (response) {
                return response;
            }, (error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("Api error:");
                    console.log("Data: ");
                    console.log(error.response.data);
                    console.log("Status: " + error.response.status);
                    console.log("Headers: ");
                    console.log(error.response.headers);

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log("Request: " + error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error: ', error.message);
                }

                return Promise.reject(error);
            }
        );
    }

    getAllAdverts(){
        let url = "/api/adverts/active";
        //let config = {params: {}};
        return this.apiInstance.get(url);
    }

    // getAdverts(criteria) {
    //     let url = "/api/adverts";
    //     let config = {params: {}};
    //
    //     // criteria === '*' is a special case which means
    //     // show all
    //     if (criteria && criteria !== "*") {
    //         url += "/filter-by-criteria";
    //         config.params = {criteria: criteria};
    //     } else {
    //         url += "/active";
    //     }
    //     return this.apiInstance.get(url, config);
    // }

        getAdvertsByTechnology(city, salary, technology) {
        console.log("From TechTrendsApi method getAdvertsVersion2. city: " + city + ", salary: " + salary + " , technology: " + technology);
        let url = "/api/adverts";
        let config = {params: {}};

        if (technology) {
            url += "/filter-technology";
            config.params = {technology: technology};
        }
        return this.apiInstance.get(url, config);
    }

    // getAdvertsByTechnology(technology) {
    //     let url = "/api/adverts/filter-technology";
    //     let config = {params: {}};
    //     if (technology) {
    //         config.params = {technology: technology};
    //     }
    //     return this.apiInstance.get(url, config);
    // }

    async checkToken(token) {
        console.log("Checking token " + token);
        this.apiInstance.defaults.headers.common['Authorization'] = token;

        await this.apiInstance.get("/api/protected/users/hello")
            .then(response => {
                return true;
            })
            .catch(reason => {
                return false;
            })
    }

    login(username, password) {
        let formData = new FormData();
        formData.set('username', username);
        formData.set('password', password);
        return this.apiInstance.post("/public/users/login", formData);
    }

    registerNewUser(username, password) {
        let formData = new FormData();
        formData.set('email', username);
        formData.set('password', password);
        return this.apiInstance.post("/public/users/registration", formData);
    }
}