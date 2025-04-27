**Client Side Performance Test Report** 

[Click to view](https://docs.google.com/spreadsheets/d/1GkC0ZA1lsBni4bm4wRP64hoq3CR_QjJaD0GLAg6wsbA/edit?usp=sharing) 

**Tools**: PageSpeed Insights

**Server Side Performance Test Report**  
**Tools :** Jmeter

1. **Load Test**  
   

| Concurrent Requests | Loop Count | Avg TPS (Total Samples) | Total Concurrent API Requests | Error Rate |
| :---- | :---- | :---- | :---- | :---- |
| 1 | 1 | 0.1 | 5 | 0% |
| 2 | 1 | 0.2 | 10 | 0% |
| 3 | 1 | 0.23 | 15 | 20% |

   
    **2\. Stress Test**

| Concurrent Requests | Loop Count | Avg TPS (Total Samples) | Total Concurrent API Requests | Error Rate |
| :---- | :---- | :---- | :---- | :---- |
| 6 | 1 | 0.23 | 30 | 63.33% |

    **3\. Spike Test**

| Concurrent Requests | Loop Count | Avg TPS (Total Samples) | Total Concurrent API Requests | Error Rate |
| :---- | :---- | :---- | :---- | :---- |
| 10 | 1 | 0.30 | 50 | 66.00% |

    **4\. Endurance test**

| Start Threads Count | Initial Delay  (sec) | Startup Time (sec) | Hold Load  For (sec) | Shutdown  Time (sec) | Total  Requests  | Error rate |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **6** | **0** | **10** | **120** | **0** | **9253** | **98.53%** |

**Summary**  
I’ve completed performance test on frequently used API for test App.   
Test executed for the below mentioned scenario in server [https://www.opencart.com/](https://www.opencart.com/) . 

1 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is \~ 0.1 And Total Concurrent API requested: 5\. Error rate: 0%

2 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is \~ 0.2 And Total Concurrent API requested: 10\. Error rate: 0%

3 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is \~ 0.23 And Total Concurrent API requested: 15\. Error rate: 20%

6 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is \~ 0.20 And Total Concurrent API requested: 30..Error rate : 63.33%

10 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is \~ 0.30 And Total Concurrent API requested: 50.Error rate: 66.00%  
.   
 **Server can handle atmost concurrent 14 API call with almost zero (0) error rate.**  
**And while executing 3 concurrent request found 15 request got connection time out error rate arrived 20%**  
 

**Introduction**

Document explains the process of performance testing with JMeter against an OpenCart E-commerce Site

# **Install**

**Java**  
 [**https://www.oracle.com/java/technologies/downloads/**](https://www.oracle.com/java/technologies/downloads/)

**JMeter**  
 [**https://jmeter.apache.org/download\_jmeter.cgi**](https://jmeter.apache.org/download_jmeter.cgi)

**Click –\>Binaries–\>apache-jmeter-5.5.zip**

**We use BlazeMeter extension to generate .JMX files**  
 [**https://chrome.google.com/webstore/detail/blazemeter-the-continuous/mbopgmdnpcbohhpnfglgohlbhfongabi?hl=en**](https://chrome.google.com/webstore/detail/blazemeter-the-continuous/mbopgmdnpcbohhpnfglgohlbhfongabi?hl=en)

# **Prerequisites**

* As of JMeter 4.0, Java 8 and above are supported.  
* We suggest multicore CPUs with 4 or more cores.  
* Memory 16GB RAM is a good value**.**

# **Elements of a minimal test plan**

* Thread Group

  The root element of every test plan. Simulates the (concurrent) users and then run all requests. Each thread simulates a single user.

* HTTP Request Default (Configuration Element)

* HTTP Request (Sampler)

* Summary Report (Listener)

# **Test Plan**

Testplan \> Add \> Threads (Users) \> Thread Group (this might vary depending on the JMeter version you are using)

* Name: Users

* Number of Threads (users): 1 to 6

* Ramp-Up Period (in seconds): 10

* Loop Count: 1

  1. The general setting for the tests execution, such as whether Thread Groups will run simultaneously or sequentially, is specified in the item called Test Plan.

  2. All HTTP Requests will use some default settings from the HTTP Request, such as the Server IP, Port Number, and Content-Encoding.

  3. Each Thread Group specifies how the HTTP Requests should be carried out. To determine how many concurrent "users" will be simulated, one must first know the number of threads. The number of actions each "user" will perform is determined by the loop count.

  4. The HTTP Header Manager, which allows you to provide the Request Headers that will be utilized by the upcoming HTTP Requests, is the first item in Thread Groups.

# **Collection of API**

Run BlazeMeter

Collect frequently used API

Save the JMX file, then paste \=\> apache-jmeter\\bin

 **List of API**

* [**https://www.opencart.com/index.php?route=common/home**](https://www.opencart.com/index.php?route=common/home)  
* [**https://www.opencart.com/index.php?route=cms/feature**](https://www.opencart.com/index.php?route=cms/feature)  
* [**https://www.opencart.com/index.php?route=marketplace/extension**](https://www.opencart.com/index.php?route=marketplace/extension)  
* [**https://www.opencart.com/index.php?route=cms/**](https://www.opencart.com/index.php?route=cms/company)**blog**  
* [**https://www.opencart.com/index.php?route=account/login**](https://www.opencart.com/index.php?route=account/login)

**OR**

### **Load the JMeter Script**

* File \> Open (CTRL \+ O)  
* Locate the "OPENCART\_T1.jmx" file contained on this repo  
* Continue open OPENCART\_T1 to OPENCART\_T6  
* Open those file  
* The Test Plan will be loaded

**![][image1]**

# **Test execution (from the Terminal)**

* JMeter should be initialized in non-GUI mode.  
* Make a report folder in the bin folder.  
* Run Command in jmeter\\bin folder.

### **Make csv file**

* n: non GUI mode  
* t: test plan to execute  
* l: output file with results

 **jmeter \-n \-t  OPENCART\_T1.jmx \-l OPENCART\_T1.csv**

**![][image2]**

### **Make jtl file**

 **jmeter \-n \-t  OPENCART\_T1.jmx \-l OPENCART\_T1.jtl**

**After completing this command**

### **Make html file**

**jmeter \-g report\\OPENCART\_T1.jtl \-o OPENCART\_T1.html**

* **g: jtl results file**

* **o: path to output folder**

**continue to upgrade Threads(1 ,2,3,6,10) by keeping Ramp-up Same.**

**![][image3]**  
**![][image4]**

**HTML Report View:**

**Load test**

 **Number of Threads 1 ; Ramp-Up Period 10s,Loop: 1**  
**![][image5]**  
**Number of Threads 2 ; Ramp-Up Period 10s,Loop: 1**  
**![][image6]**  
**Number of Threads 3 ; Ramp-Up Period 10s,Loop: 1**

| ![][image7] | ![][image8] |
| :---- | :---- |

**Stress test**

**Number of Threads 6 ; Ramp-Up Period 10s,Loop: 1**  
**![][image9]![][image10]**

**Spike test**

**Number of Threads 10 ; Ramp-Up Period 10s,Loop: 1**

| ![][image11] | ![][image12] |
| :---- | :---- |

**Endurance test**  
Instead of Normal, Thread group select jp@gc ultimate thread group  
**Start Threads count 6s ; Initial Delay 0s ; Start up Time 10s ; Hold load for 120s ; Shutdown Time 0s**  
**![][image13]**  
**![][image14]**

# **Read Test Data from CSV file in Jmeter**

**Create a CSV file in the test suite folder and add test data to it.**    
**![][image15]**  
**Add a Config Element CSV Data Set Config in Jmeter.**   
**![][image16]**

**Configure ' CSV Data Set Config ' based on the need such as providing path of CSV file and variable names and other configs.**   

**Goto HTTP request /Body data and set json data according to csv file**  
**![][image17]**

**Run the test and see the result**  
**![][image18]** 

[image1]: 
[image2]: 
[image3]: 
[image4]: 

[image5]: 

[image6]: 
[image7]: 
[image8]: 

[image9]: 

[image10]: 

[image11]: 
[image12]: 

[image13]: 

[image14]: 

[image15]: 
[image16]: 
[image17]: 

[image18]: 




