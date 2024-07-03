const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3001; // SQLite 서버가 실행될 포트

// SQLite 데이터베이스 설정 및 초기화
async function openDatabase() {
  try {
    const db = await open({
      filename: './baseball.db',
      driver: sqlite3.Database,
    });
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// 서버 시작 시 데이터베이스 초기화
let db;
openDatabase().then(database => {
  db = database;
  console.log('Database initialized');
}).catch(error => {
  console.error('Error initializing database:', error);
});

// SQLite 데이터베이스에서 경기 결과 조회
async function queryGameResult(date) {
  try {
    const result = await db.get('SELECT * FROM game WHERE gameDate = ?', date);
    return result;
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
}

// SQLite 데이터베이스에 질문 삽입 및 업데이트
async function queryInsertQuestion(question, keyword) {
  try {
    // 단어가 존재하는지 찾음
    const exist = await db.get('SELECT * FROM questionLog WHERE question LIKE ?', `%${keyword}%`);
    
    if (!exist) {
      // 단어가 존재하지 않으면 삽입
      await db.run(
        'INSERT INTO questionLog (question, answer, count) VALUES (?, ?, ?)',
        [question, '', 1] // answer는 빈 문자열로 초기화하고, count는 1로 설정
      );
    } else {
      // 단어가 존재하면 count 증가
      await db.run(
        'UPDATE questionLog SET count = count + 1 WHERE id = ?',
        [exist.id]
      );
    }
  } catch (error) {
    console.error("Error inserting or updating database:", error);
    throw error;
  }
}
// SQLite 데이터베이스에서 선수 정보 조회
async function queryPlayerData(name) {
  try {
    const result = await db.get('SELECT * FROM player WHERE playerName = ?', name);
    return result;
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
}
// SQLite 데이터베이스에서 모든 경기 결과 조회
async function getAllGames() {
  try {
    const result = await db.all('SELECT * FROM game');
    return result;
  } catch (error) {
    console.error("Error fetching all games:", error);
    throw error;
  }
}

// Express 서버 설정
app.use(express.json());

app.get('/player', async (req, res) => {
  const { name } = req.query;
  // console.log('name',name)
  try {
    const dbResult = await queryPlayerData(name);
    res.status(200).json({ success: true, data: dbResult });
  } catch (error) {
      res.status(500).json({ success:false, data:null, message: '서버 에러 발생, 다시 시도 해주세요.' });
  }
})

app.get('/game-result', async (req, res) => {
  const { date } = req.query;
  try {
    const dbResult = await queryGameResult(date);
    // console.log('result',dbResult)
    if (dbResult !== undefined) {
      const { gameDate, home, hscore, visit, vscore, kt_win } = dbResult;
      const formattedResult = {
        gameDate,
        home,
        homeScore:hscore,
        visit,
        visitScore:vscore,
        result:kt_win
      };
      res.status(200).json({success:true, data: formattedResult});
    } else {
      res.status(200).json({ success:false, data:null, message: "해당 날은 경기가 진행되지 않았습니다. 다른 경기 일정을 질문해주세요." });
    }
  } catch (error) {
    res.status(500).json({ success:false, data:null, message: '서버 에러 발생, 다시 시도 해주세요.' });
  }
});

app.post('/insert-question', async (req, res) => {
  const { question, keyword } = req.body;

  if (!question || !keyword) {
    return res.status(400).json({ success:false, data:null, message: '질문과 키워드를 입력해주세요.' });
  }

  try {
    await queryInsertQuestion(question, keyword);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error inserting or updating database:", error);
       res.status(500).json({ success:false, data:null, message: '서버 에러 발생, 다시 시도 해주세요.' });
  }
});

// 루트 경로에서 모든 경기 결과를 보여줌
app.get('/', async (req, res) => {
  try {
    const dbResult = await getAllGames();
    res.json(dbResult);
  } catch (error) {
    console.error("Error fetching all games:", error);
       res.status(500).json({ success:false, data:null, message: '서버 에러 발생, 다시 시도 해주세요.' });
  }
});

app.listen(port, () => {
  console.log(`SQLite server running at http://localhost:${port}`);
});