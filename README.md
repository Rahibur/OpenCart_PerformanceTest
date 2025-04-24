**Client Side Performance Test Report** 

[Click to view](https://docs.google.com/spreadsheets/d/1GkC0ZA1lsBni4bm4wRP64hoq3CR_QjJaD0GLAg6wsbA/edit?usp=sharing) 

**Tools**: PageSpeed Insights

**Server Side Performance Test Report**

1. **Load Test**

|**Concurrent Requests**|**Loop Count**|**Avg TPS (Total Samples)**|**Total Concurrent API Requests**|**Error Rate**|
| :- | :- | :- | :- | :- |
|1|1|0\.1|5|0%|
|2|1|0\.2|10|0%|
|3|1|0\.23|15|20%|

** 

`    `**2. Stress Test**

|**Concurrent Requests**|**Loop Count**|**Avg TPS (Total Samples)**|**Total Concurrent API Requests**|**Error Rate**|
| :- | :- | :- | :- | :- |
|6|1|0\.23|30|63\.33%|


`    `**3. Spike Test**

|**Concurrent Requests**|**Loop Count**|**Avg TPS (Total Samples)**|**Total Concurrent API Requests**|**Error Rate**|
| :- | :- | :- | :- | :- |
|10|1|0\.30|50|66\.00%|

`    `**4. Endurance test**

|**Start Threads Count**|<p>**Initial Delay** </p><p>**(sec)**</p>|**Startup Time (sec)**|<p>**Hold Load** </p><p>**For (sec)**</p>|<p>**Shutdown** </p><p>**Time (sec)**</p>|<p>**Total** </p><p>**Requests** </p>|**Error rate**|
| :- | :- | :- | :- | :- | :- | :- |
|**6**|**0**|**10**|**120**|**0**|**9253**|**98.53%**|











