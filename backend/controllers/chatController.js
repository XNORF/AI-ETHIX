import Chat from "../models/Chat.js";
const chat = async (req, res) => {
    const { query, apiMessages } = req.body;

    try {
        const chat = new Chat();
        const ref = await chat.sendQuery(query);
        const id = ref.id;

        // Using a loop with a delay to wait for the data to get embedded
        let data;
        for (let i = 0; i < 10; i++) {
            // Retry up to 10 times
            data = await chat.getData(id);
            if (data && data.data && data.data().result && data.data().result.ids) {
                break;
            }
            await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 500ms
        }

        if (!data || !data.data || !data.data().result || !data.data().result.ids) {
            throw new Error("Failed to retrieve data or data is incomplete");
        }

        const dataIDs = data.data().result.ids;
        const queryDataPromises = dataIDs.map((id) => chat.getContents(id).then((content) => content.data()));

        const queryData = await Promise.all(queryDataPromises);

        // Clean unnecessary data
        const filteredData = queryData.map((data) => ({
            title: data.title,
            content: data.content,
            author: data.author,
            source: data.source,
            type: data.type,
        }));

        const response = await chat.chat(apiMessages, filteredData);
        res.status(200).json(response.choices[0].message.content);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

/* const chat = async (req, res) => {
    const { query } = req.body;

    try {
        const chat = new Chat();
        let id;
        await chat.sendQuery(query).then((ref) => {
            id = ref.id;
        });

        //Wait until data gets embedded
        setTimeout(async function () {
            await chat.getData(id).then(async (data) => {
                const queryDataPromises = [];
                const dataIDs = data.data().result.ids;

                dataIDs.forEach((id) => {
                    const contentPromise = chat.getContents(id).then((content) => content.data());
                    queryDataPromises.push(contentPromise);
                });

                const queryData = await Promise.all(queryDataPromises);

                //Clean unnecessary data
                const filteredData = [];
                queryData.forEach((data) => {
                    filteredData.push({ title: data.title, content: data.content, author: data.author, source: data.source, type: data.type });
                });
                const response = await chat.chat(query, filteredData);
                res.status(200).json(response.choices[0].message.content);
            });
        }, 5000);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}; */

export { chat };
