class WeightedGraph {
    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, new Map());
        }
    }

    addEdge(vertex1, vertex2, weight) {
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        this.adjacencyList.get(vertex1).set(vertex2, weight);
        this.adjacencyList.get(vertex2).set(vertex1, weight);
    }

    removeEdge(vertex1, vertex2) {
        if (this.adjacencyList.has(vertex1)) {
            this.adjacencyList.get(vertex1).delete(vertex2);
        }
        if (this.adjacencyList.has(vertex2)) {
            this.adjacencyList.get(vertex2).delete(vertex1);
        }
    }

    removeVertex(vertex) {
        if (this.adjacencyList.has(vertex)) {
            for (let neighbor of this.adjacencyList.get(vertex).keys()) {
                this.adjacencyList.get(neighbor).delete(vertex);
            }
            this.adjacencyList.delete(vertex);
        }
    }

    shortestPath(start, end) {
        let distances = new Map();
        let previous = new Map();
        let queue = new Set();

        for (let vertex of this.adjacencyList.keys()) {
            distances.set(vertex, Infinity);
            previous.set(vertex, null);
            queue.add(vertex);
        }
        distances.set(start, 0);

        while (queue.size) {
            let minVertex = [...queue].reduce((min, v) => distances.get(v) < distances.get(min) ? v : min);
            queue.delete(minVertex);
            if (minVertex === end) break;

            for (let [neighbor, weight] of this.adjacencyList.get(minVertex)) {
                let alt = distances.get(minVertex) + weight;
                if (alt < distances.get(neighbor)) {
                    distances.set(neighbor, alt);
                    previous.set(neighbor, minVertex);
                }
            }
        }

        let path = [];
        for (let at = end; at; at = previous.get(at)) {
            path.push(at);
        }
        return path.reverse();
    }

    getSize() {
        return this.adjacencyList.size;
    }
}
