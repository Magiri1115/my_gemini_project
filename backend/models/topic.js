const insertTopics = async function (topics, pool) {
    try {
        for(const topic of topics){
            const res = await pool.query('INSERT INTO topics (name) VALUES ($1) ON CONFLICT DO NOTHING', [topic])
        }
    } catch (error) {
        throw error
    }
}

const insertCooccurrence = async function (topics, pool) {
    try {
        for(let i = 0; i < topics.length; i++){
            for(let j = i + 1; j < topics.length; j++){
                const topic1Res = await pool.query('SELECT id FROM topics WHERE name = $1', [topics[i]])
                const topic2Res = await pool.query('SELECT id FROM topics WHERE name = $1', [topics[j]])
                if(topic1Res.rows.length > 0 && topic2Res.rows.length > 0){
                    const topic1Id = topic1Res.rows[0].id
                    const topic2Id = topic2Res.rows[0].id
                    const res = await pool.query('INSERT INTO cooccurrence (topic1_id, topic2_id) VALUES ($1, $2) ON CONFLICT DO UPDATE SET count = cooccurrence.count + 1', [topic1Id, topic2Id])
                }
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = {insertTopics, insertCooccurrence}
