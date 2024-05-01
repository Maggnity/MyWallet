import connection from ".";

export class Query {

    constructor() {


    }

    async execute(query: string, filters: {}, params: any[]) {
        connection.connect((e) => console.log("connected to database", e.name))

        connection.query(query, (error, results, fields) => {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
            return results
        });

        connection.end()

    }


}