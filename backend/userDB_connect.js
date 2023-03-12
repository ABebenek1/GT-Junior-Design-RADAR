const {MongoClient} = require('mongodb');

async function main() {
    const uri = "mongodb+srv://abebenek:mbFRw2gSG-Q6kb2@cluster0.ahumge0.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error)
