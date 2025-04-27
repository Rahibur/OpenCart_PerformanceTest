**Client Side Performance Test Report**

[[Click to
view]{.underline}](https://docs.google.com/spreadsheets/d/1GkC0ZA1lsBni4bm4wRP64hoq3CR_QjJaD0GLAg6wsbA/edit?usp=sharing)

**Tools**: PageSpeed Insights

**Server Side Performance Test Report**

**Tools :** Jmeter

1.  **Load Test**

  -------------------------------------------------------------------------
  **Concurrent    **Loop    **Avg TPS (Total **Total Concurrent   **Error
  Requests**      Count**   Samples)**       API Requests**       Rate**
  --------------- --------- ---------------- -------------------- ---------
  1               1         0.1              5                    0%

  2               1         0.2              10                   0%

  3               1         0.23             15                   20%
  -------------------------------------------------------------------------

**2. Stress Test**

  -------------------------------------------------------------------------
  **Concurrent    **Loop    **Avg TPS (Total **Total Concurrent   **Error
  Requests**      Count**   Samples)**       API Requests**       Rate**
  --------------- --------- ---------------- -------------------- ---------
  6               1         0.23             30                   63.33%

  -------------------------------------------------------------------------

**3. Spike Test**

  -------------------------------------------------------------------------
  **Concurrent    **Loop    **Avg TPS (Total **Total Concurrent   **Error
  Requests**      Count**   Samples)**       API Requests**       Rate**
  --------------- --------- ---------------- -------------------- ---------
  10              1         0.30             50                   66.00%

  -------------------------------------------------------------------------

**4. Endurance test**

+------------+--------+-------+----------+-------+------+------------+
| **Start    | **I    | **St  | **Hold   | **    | *    | **Error    |
| Threads    | nitial | artup | Load**   | Shutd | *Tot | rate**     |
| Count**    | D      | Time  |          | own** | al** |            |
|            | elay** | (s    | **For    |       |      |            |
|            |        | ec)** | (sec)**  | *     | **Re |            |
|            | **(    |       |          | *Time | ques |            |
|            | sec)** |       |          | (s    | ts** |            |
|            |        |       |          | ec)** |      |            |
+============+========+=======+==========+=======+======+============+
| **6**      | **0**  | *     | **120**  | **0** | **92 | **98.53%** |
|            |        | *10** |          |       | 53** |            |
+------------+--------+-------+----------+-------+------+------------+

**Summary**

I've completed performance test on frequently used API for test App.

Test executed for the below mentioned scenario in server
[[https://www.opencart.com/]{.underline}](https://www.opencart.com/) .

1 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is \~
0.1 And Total Concurrent API requested: 5. Error rate: 0%

2 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is \~
0.2 And Total Concurrent API requested: 10. Error rate: 0%

3 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is \~
0.23 And Total Concurrent API requested: 15. Error rate: 20%

6 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is \~
0.20 And Total Concurrent API requested: 30..Error rate : 63.33%

10 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is \~
0.30 And Total Concurrent API requested: 50.Error rate: 66.00%

.

**Server can handle atmost concurrent 14 API call with almost zero (0)
error rate.**

**And while executing 3 concurrent request found 15 request got
connection time out error rate arrived 20%**

**Introduction**

Document explains the process of performance testing with JMeter against
an OpenCart E-commerce Site

# **Install**

**Java\
**
[**[https://www.oracle.com/java/technologies/downloads/]{.underline}**](https://www.oracle.com/java/technologies/downloads/)

**JMeter\
**
[**[https://jmeter.apache.org/download_jmeter.cgi]{.underline}**](https://jmeter.apache.org/download_jmeter.cgi)

**Click --\>Binaries--\>apache-jmeter-5.5.zip**

**We use BlazeMeter extension to generate .JMX files\
**
[**[https://chrome.google.com/webstore/detail/blazemeter-the-continuous/mbopgmdnpcbohhpnfglgohlbhfongabi?hl=en]{.underline}**](https://chrome.google.com/webstore/detail/blazemeter-the-continuous/mbopgmdnpcbohhpnfglgohlbhfongabi?hl=en)

# **Prerequisites**

-   As of JMeter 4.0, Java 8 and above are supported.

-   We suggest multicore CPUs with 4 or more cores.

-   Memory 16GB RAM is a good value**.**

# **Elements of a minimal test plan**

-   Thread Group\
    > \
    > The root element of every test plan. Simulates the (concurrent)
    > users and then run all requests. Each thread simulates a single
    > user.

-   HTTP Request Default (Configuration Element)

-   HTTP Request (Sampler)

-   Summary Report (Listener)

# **Test Plan**

Testplan \> Add \> Threads (Users) \> Thread Group (this might vary
depending on the JMeter version you are using)

-   Name: Users

-   Number of Threads (users): 1 to 6

-   Ramp-Up Period (in seconds): 10

-   Loop Count: 1

    1.  The general setting for the tests execution, such as whether
        > Thread Groups will run simultaneously or sequentially, is
        > specified in the item called Test Plan.

    2.  All HTTP Requests will use some default settings from the HTTP
        > Request, such as the Server IP, Port Number, and
        > Content-Encoding.

    3.  Each Thread Group specifies how the HTTP Requests should be
        > carried out. To determine how many concurrent \"users\" will
        > be simulated, one must first know the number of threads. The
        > number of actions each \"user\" will perform is determined by
        > the loop count.

    4.  The HTTP Header Manager, which allows you to provide the Request
        > Headers that will be utilized by the upcoming HTTP Requests,
        > is the first item in Thread Groups.

# **Collection of API**

Run BlazeMeter

Collect frequently used API

Save the JMX file, then paste =\> apache-jmeter\\bin**\
\
List of API**

-   [**[https://www.opencart.com/index.php?route=common/home]{.underline}**](https://www.opencart.com/index.php?route=common/home)

-   [**[https://www.opencart.com/index.php?route=cms/feature]{.underline}**](https://www.opencart.com/index.php?route=cms/feature)

-   [**[https://www.opencart.com/index.php?route=marketplace/extension]{.underline}**](https://www.opencart.com/index.php?route=marketplace/extension)

-   **[[https://www.opencart.com/index.php?route=cms/](https://www.opencart.com/index.php?route=cms/company)blog]{.underline}**

-   [**[https://www.opencart.com/index.php?route=account/login]{.underline}**](https://www.opencart.com/index.php?route=account/login)

**OR**

### **Load the JMeter Script**

-   File \> Open (CTRL + O)

-   Locate the \"OPENCART_T1.jmx\" file contained on this repo

-   Continue open OPENCART_T1 to OPENCART_T6

-   Open those file

-   The Test Plan will be loaded

![](./image14.png){width="7.458333333333333in"
height="3.4014260717410325in"}

# **Test execution (from the Terminal)**

-   JMeter should be initialized in non-GUI mode.

-   Make a report folder in the bin folder.

-   Run Command in jmeter\\bin folder.

### **Make csv file**

-   n: non GUI mode

-   t: test plan to execute

-   l: output file with results

**jmeter -n -t OPENCART_T1.jmx -l OPENCART_T1.csv**

![](./image9.png){width="7.125in" height="1.5694444444444444in"}

### **Make jtl file**

**jmeter -n -t OPENCART_T1.jmx -l OPENCART_T1.jtl**

**After completing this command**

### **Make html file**

**jmeter -g report\\OPENCART_T1.jtl -o OPENCART_T1.html**

-   **g: jtl results file\
    > **

-   **o: path to output folder**

**continue to upgrade Threads(1 ,2,3,6,10) by keeping Ramp-up Same.**

![](./image12.jpg){width="7.125in" height="0.9583333333333334in"}

![](./image13.jpg){width="7.119792213473316in"
height="1.4052220034995626in"}

**HTML Report View:**

**Load test**

**Number of Threads 1 ; Ramp-Up Period 10s,Loop: 1**

![](./image10.jpg){width="5.79188210848644in"
height="2.0237718722659666in"}

**Number of Threads 2 ; Ramp-Up Period 10s,Loop: 1**

![](./image10.jpg){width="5.802637795275591in"
height="2.0234284776902887in"}

**Number of Threads 3 ; Ramp-Up Period 10s,Loop: 1**

  ---------------------------------------------------------------------------------------------------------------
  ![](./image15.png){width="3.9479166666666665in"   ![](./image17.png){width="3.7291666666666665in"
  height="1.6543886701662291in"}                          height="1.8835553368328959in"}
  ------------------------------------------------------- -------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------

**Stress test**

**Number of Threads 6 ; Ramp-Up Period 10s,Loop: 1**

![](./image7.png){width="7.125in"
height="2.5277777777777777in"}![](./image1.png){width="7.125in"
height="3.0in"}

**Spike test**

**Number of Threads 10 ; Ramp-Up Period 10s,Loop: 1**

  -----------------------------------------------------------------------------------------
  ![](./image16.png){width="3.40625in"   ![](./image18.png){width="3.40625in"
  height="1.2222222222222223in"}               height="1.3888888888888888in"}
  -------------------------------------------- --------------------------------------------

  -----------------------------------------------------------------------------------------

**Endurance test**

Instead of Normal, Thread group select jp@gc ultimate thread group

**Start Threads count 6s ; Initial Delay 0s ; Start up Time 10s ; Hold
load for 120s ; Shutdown Time 0s**

![](./image3.png){width="7.125in" height="2.7222222222222223in"}

![](./image5.png){width="5.203125546806649in"
height="2.806948818897638in"}

# **Read Test Data from CSV file in Jmeter**

**Create a CSV file in the test suite folder and add test data to it.**

![](./image2.png){width="2.9270833333333335in" height="1.53125in"}

**Add a Config Element CSV Data Set Config in Jmeter.**

![](./image4.png){width="7.125in" height="2.9722222222222223in"}

**Configure \' CSV Data Set Config \' based on the need such as
providing path of CSV file and variable names and other configs.**

**Goto HTTP request /Body data and set json data according to csv file**

![](./image6.png){width="7.125in" height="2.8472222222222223in"}

**Run the test and see the result**

![](./image11.png){width="7.125in" height="3.263888888888889in"}
