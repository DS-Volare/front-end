export const inputSentences1 = [
['왕자는', '너무도', '친숙한', '라푼젤의', '목소리가', '들리자', '앞으로', '나아갔어요.'],
['왕자는', '다가오자마자', '라푼젤은', '왕자를', '알아보고', '목을', '감싸며', '안겨서', '울었어요.'],
['그때', '라푼젤의', '눈물', '두', '방울이', '그의', '눈들을', '적셨어요.'],
['그러자', '왕자의', '시력이', '점점', '밝아지며', '급기야', '예전처럼', '라푼젤을', '볼', '수', '있게', '되었어요.'],
['왕자는', '라푼젤을', '데리고', '자신의', '왕국으로', '돌아갔어요.'],
['왕국에서도', '왕자의', '일행을', '대환영해주었어요.'],
['이후', '그들은', '행복해하고', '만족해하며', '오래토록', '잘', '살았답니다.'],

['왕자는', '너무도', '친숙한', '라푼젤의', '목소리가', '들리자', '앞으로', '나아갔어요.'],
['왕자는', '다가오자마자', '라푼젤은', '왕자를', '알아보고', '목을', '감싸며', '안겨서', '울었어요.'],
['그때', '라푼젤의', '눈물', '두', '방울이', '그의', '눈들을', '적셨어요.'],
['그러자', '왕자의', '시력이', '점점', '밝아지며', '급기야', '예전처럼', '라푼젤을', '볼', '수', '있게', '되었어요.'],
['왕자는', '라푼젤을', '데리고', '자신의', '왕국으로', '돌아갔어요.'],
['왕국에서도', '왕자의', '일행을', '대환영해주었어요.'],
['이후', '그들은', '행복해하고', '만족해하며', '오래토록', '잘', '살았답니다.'],

['왕자는', '너무도', '친숙한', '라푼젤의', '목소리가', '들리자', '앞으로', '나아갔어요.'],
['왕자는', '다가오자마자', '라푼젤은', '왕자를', '알아보고', '목을', '감싸며', '안겨서', '울었어요.'],
['그때', '라푼젤의', '눈물', '두', '방울이', '그의', '눈들을', '적셨어요.'],
['그러자', '왕자의', '시력이', '점점', '밝아지며', '급기야', '예전처럼', '라푼젤을', '볼', '수', '있게', '되었어요.'],
['왕자는', '라푼젤을', '데리고', '자신의', '왕국으로', '돌아갔어요.'],
['왕국에서도', '왕자의', '일행을', '대환영해주었어요.'],
['이후', '그들은', '행복해하고', '만족해하며', '오래토록', '잘', '살았답니다.'],
];
// dummy data (하이라이트할 결과 데이터 예시)
export const resultData1 = [
[{ text: '왕자는', sent_id: 0, start_eid: 0, end_eid: 0 },
{ text: '왕자는', sent_id: 1, start_eid: 0, end_eid: 0 },
{ text: '왕자를', sent_id: 1, start_eid: 3, end_eid: 3 },
{ text: '왕자의', sent_id: 3, start_eid: 1, end_eid: 1 },
{ text: '왕자는', sent_id: 4, start_eid: 0, end_eid: 0 },
{ text: '왕자는', sent_id: 4, start_eid: 3, end_eid: 3 },
{ text: '왕자의', sent_id: 5, start_eid: 1, end_eid: 1 },
],[
{ text: '왕자는', sent_id: 7, start_eid: 0, end_eid: 0 },
{ text: '왕자는', sent_id: 8, start_eid: 0, end_eid: 0 },
{ text: '왕자를', sent_id: 8, start_eid: 3, end_eid: 3 },
{ text: '왕자의', sent_id: 10, start_eid: 1, end_eid: 1 },
{ text: '왕자는', sent_id: 11, start_eid: 0, end_eid: 0 },
{ text: '왕자는', sent_id: 11, start_eid: 3, end_eid: 3 },
{ text: '왕자의', sent_id: 12, start_eid: 1, end_eid: 1 },
],
[{ text: '라푼젤의', sent_id: 0, start_eid: 3, end_eid: 3 },
{ text: '라푼젤은', sent_id: 1, start_eid: 2, end_eid: 2 },
{ text: '라푼젤은', sent_id: 2, start_eid: 1, end_eid: 1 },
{ text: '라푼젤을', sent_id: 3, start_eid: 7, end_eid: 7 },
{ text: '라푼젤을', sent_id: 4, start_eid: 1, end_eid: 1 },
],[
{ text: '라푼젤의', sent_id: 7, start_eid: 3, end_eid: 3 },
{ text: '라푼젤은', sent_id: 8, start_eid: 2, end_eid: 2 },
{ text: '라푼젤은', sent_id: 9, start_eid: 1, end_eid: 1 },
{ text: '라푼젤을', sent_id: 10, start_eid: 7, end_eid: 7 },
{ text: '라푼젤을', sent_id: 11, start_eid: 1, end_eid: 1 },
]  
];