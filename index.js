const Cluster = require("couchbase").Cluster;

function openAsync(cluster, bucketName) {
    return new Promise((resolve, reject) => {
        cluster.openBucket(bucketName, (err, bucket) => {
            if (err) {
                reject(err);
            } else {
                resolve(bucket);
            }
        })
    })
}

async function handler() {
    throw new Error("Triggering error");
}

async function test() {
    let cluster = new Cluster("couchbase://localhost");

    let bucket = cluster.openBucket("default");

    try {
        await handler();        
    } finally {
        bucket.disconnect();
    }
}

test().catch((err) => {
    console.log(err);
});