# Sign In/Search/Profile and landing page

# **User flow: ( [https://whimsical.com/student-potal-sing-in-flow-MReZGWx3syT44ieZSq8o3j](https://whimsical.com/student-potal-sing-in-flow-MReZGWx3syT44ieZSq8o3j))**

1. User enters email ID and password and clicks sign in.  
2. Credentials to be validated and redirected accordingly.

**Credential Source:** In the admin portal, the student data, as given by the college, will be preloaded. As soon as the database is loaded, the student will receive a welcome email along with a password  link. They can set the password they want. 

Authentication Requirements:

1. 8 characters, one uppercase, one number, one symbol  
2. Password link- validity 1 hour  
3. 5 failed login attempts- 15 mins cool off period.

# **Login Failure:**

1. Error: “Invalid email Id/Password”   
2. Retry or click forgot password.  
3. On clicking forgot password—\> redirect to “enter your email ID here”----\> Submit  
4. Neutral message: “A password link has been sent to your registered email ID”  
5. The student will have to reset the password.

# **Login Success:**

The student will be redirected to the Home page.

**Components of the Home page:**

1. Logo to the top left corner  
2. To the top right corner- Search, profile  
3. Hamburger menu  
4. Welcome note  
5. Learning progress  
6. Calendar view  
7. Task list  
8. Updates

## **Logo on the top left corner:** 

Functional Requirement (FR)- The logo must be clickable. From any page, if the student clicks on the logo, he/she must be redirected to the landing page. If the student is already on the home page, clicking on the logo must take them to the top of the page.

## **Search:**

FR 1.1: On clicking the search icon, it must expand into a text box.  
FR 1.2: As the student types any topic, it must give them a dropdown with all possible quick links. ( [https://whimsical.com/search-button-flow-V1RBhe4P5UoJkPiZhV7sm8](https://whimsical.com/search-button-flow-V1RBhe4P5UoJkPiZhV7sm8) )

## **Profile:**

FR 2.1: On clicking the profile icon, the student must be redirected to the profile page where he/she can add or edit details. ( [https://whimsical.com/profile-icon-flow-6m2vPFtxEGQRta4vrrcEJC](https://whimsical.com/profile-icon-flow-6m2vPFtxEGQRta4vrrcEJC) )

## **Hamburger Menu: ( [https://whimsical.com/menu-flow-learning-journey-CcQvrsDNAvyc7MkWULAK4o](https://whimsical.com/menu-flow-learning-journey-CcQvrsDNAvyc7MkWULAK4o) )**

FR 3.1: It is a clickable menu that must expand on clicking.

## **Learning Progress:**

The following are the definitions for elements of learning progress.

Course- A set of pillars which are designed to accomplish an outcome.  
Core Skill- An umbrella of various skills of the same nature.  
Module- A set of chapters which are designed to help the student learn a particular skill.  
Chapter- An individual chapter which focuses on helping the student learn all the subskills to make up for a skill.  
Assessments- A test either text, video, audio or MCQs designed to assess the student’s competency levels.

**FR4.1: Progress bar display**

The progress bar must show the completion of the modules, chapters and assessments both in numerical values and percentages.  (no of (m/c/a) completed/Total no of (m/c/a)(% completion)

**Data source:**   
Total number of M/C/A- As per the input given in creating these courses on the admin page.  
Completed M/C/A- based on the students completion on the portal

**FR4.2: Clickability**

The progressbar must be clickable. On clicking any of the progress bar the student must be take to the respective pages.

Module Bar- The page of the current module the student has to complete.   
Chapter Bar- The page of the current chapter the student has to complete.  
Assessment bar- The page of the current assessment that the student has to complete.

Current means- The immediate next incomplete one. If the progress is at 0% take the student to the first module/chapter/assessment he has to complete. If the progress is at 100%- The clickability isn’t essential.

Logic- Each module, chapter and assessment pages must be made open/accessible linearly based on completion of the previous module, chapter and assessment.The learning progression will be defined while creating the course on the admin page.

**FR4.3: Visual States**

Yet to start- Gray (0%)  
In progress- Purple/Orange or combination (1-99%)  
Completed- Green(100%)

**FR4.4. Completion calculation:**

For now, the only aspect we are tracking is assessment. The completion of a chapter means the completion of all the assessments in the given chapter. The completion of a module means the completion of all the chapters tagged to the module.  
Edge cases: 

1. If a student fails an assessment- It will not be counted as completion. There is a minimum passing score to mark completion. This is yet to be defined.   
2. Tentatively, we might have to have different passing scores on each module based on the skill tree. Therefore it’s best if the passing score can also be defined while creating the course on the admin portal itself.  
     
   

## **Calendar:**

The functionality of the calender is to show the attendance of the student. 

FR 5.1- The student is present the date should be green if the student is absent the date must be red.

Present- A student is considered present, if he completes the pertaining assessments and the the teacher in the class marks him present on the teach portal/app.  
Absent- If only either of the above inputs is true or both are false. The student will be considered absent.

FR5.2- On clicking the date, the student must also find the click link for a feedback form for the session.

**Dependency-** The deadline will be configured per assessment on the admin portal while creating the course.

Tentatively- In the future when we add AI cameras, face recognition will be one of the parameters for the attendance.

Edge cases: 

1. Student completed the assessment but teacher did not mark the attendance- Nothing can be done here from the tech front.  
2. Student completed the assessment but failed- here we only consider the attempt and not the passing. Any student who has clicked the submit button here within the deadline will be considered present.  
3. **Dependency:** If a class is rescheduled- Then the date tab must be gray and this should not be counted in calculating the attendance percentage of the student. The rescheduling the class will be done by the teacher on the teacher portal. The teacher will also enter the new date and the scheduled chapter will be tagged to the new date.  
4. The dates for the future classes and no classes also will appear gray

FR 5.2- On clicking the dates, the student must be taken to the chapter page of the chapter completed on that date.

**Dependency:** Date tagging of the chapter will be done on the admin portal for every college individually based on the course start dates and the no of modules agreed upon as per the agreement with the college.

## **Task list:**

The task list will show the pending and upcoming tasks assigned to student.

Task is nothing but an assessment for now. In the future this definition will keep evolving.

FR6.1: Visual states  
Red- Any task if not attempted before the deadline.  
Amber- Any task that has a submission deadline as on date.  
Green- Any task that has deadline from T+1 day. (This list must only contain the list of tasks for the chapters completed/ to be completed as on today. The future tasks must open up for every applicable calendar day.)  
Completed task- Attempted and passed need not reflect here.

Edge cases: 

1. If the student attempted it before the deadline but did  not pass,it will show in amber/green based on the deadline date.   
2. A student can re-attempt it and if they clear the task is completed and disappears.   
3. There is no restriction on the number of attempts. However the attempts data must be captured on the backend.   
4. The task will show in the list until the student has passed. If the student did not pass the test till the deadline it will show red. The student must retake the test till he atleast obtains a passing score.

**Dependency-** The deadlines will be tagged on the admin portal as mentioned earlier. The date tagging of the chapters will also be done on the admin portal.

FR6.2- Clickability  
On clicking the task, it should take the student to the respective assessment page.

## **Updates:**

The functionality of updates is to show any articles released from the admin portal. Or any assessment marking notifications from the teacher portal.

FR7.1- The teacher will mark the assessments manually for the initial days until the AI model is trained. As and when the scoring is submitted by the teacher on the teacher portal, the student will see the result page link in the updates section. Once the student views the score the link will disappear from this section but the student can continue accessing his score under the learning journey section.  
FR7.2- Communication/Articles/posts

Tentatively, if we start sending out any articles, posts or relevant job opportunities in the future, it will reflect in the updates. These will be sent from the admin portal only. Once the student views it, it also disappears from the list. We will later decide where should the student access those as and when we add the feature.

# Menu\_Learning Journey

[https://whimsical.com/menu-flow-learning-journey-CcQvrsDNAvyc7MkWULAK4o](https://whimsical.com/menu-flow-learning-journey-CcQvrsDNAvyc7MkWULAK4o)

On clicking the hamburger menu- The menu expands and learning journey is a part of the 4 major sub headings in the menu.

On clicking learning journey- The student will go the landing page.

Components of the landing page:

1. Learning Progress bar  
2. Task completion  
3. Skills accomplished  
4. Content Quick Links  
5. Badges

# **Learning progress bar:**

The functionality of the learning progress bar is to show the student how much he has covered in the overall course content.

Definitions:  
Elements of the learning progress include viewing notes, pre-assessments & post-assessments. In the next phase, we may include video learning & Case studies also in it.  
The completion of the pre& post session assessments whether done before-on-or after the deadline, will be considered completion. Every post assessment has a minimum passing score. 

FR 2.1: As the student hovers on the bar- he will see (Completed chapters \+ Completed assessments)/(Total no of chapters \+ Total no of assessments).  
Assessment completion means attempting the assessment. Each chapter will be provided with PPTs or notes based on the nature of the chapter. If the PPT has 25 slide, the student must have gone to all the slides. Only then is it considered complete. The student must move to each slide on click. There is no timer per slide as of now. We can add it in future phases.  
FR 2.2: This need not be a clickable bar. It is only to give insight to the student.   
FR 2.3: There must be both a numerical & %age representation of the completion.  
FR 2.4: If the student has yet to begin the learning, the bar should be gray, in progress- purple, and completed- green. 

**Dependency:** The total no of chapters and assessments for the course will be designed on the admin portal.

# **Task Completion:**

The task is the pre-assessment and post-assessment, & View notes/PPT

Completion Criteria- 

Pre- assessment- Attempt only counts as completion.  
Post Assessment- Attempt within/after dead deadline will count as completion however, the date of submission and time of submission must be captured for future reference.   
View Notes- Post each session, the student must have gone through the notes of the session. 

Taskbar-  
FR 3.1: The taskbar on hover, will display both the numerical and percentage completion of the assessments.  eg : 5/10 (50%)  
FR 3.2: This is a clickable bar. On clicking the bar- it must take to the task page.  
FR 3.3: Yet to start(0%)- Gray, In progress(1-99%)- Purple, Completed(100%)- green. The bar must show in orange if the student has completed the task but did not pass the assessment. The completion must, however, reflect in the numerical and %age data. Once the student re-attempts the assessment and passes, the bar will go back to purple/green based on the completion rate.

**Screen 1:** On clicking the weekly task completion bar

The elements of screen one include the task list for the week/month (depending on the filter), deadline, progress bar, priority, CTA (resume, start, review,retake), Status & due date.

FR 3.5a: The task list appears in the order of priority.  
FR 3.5b: The priority is a function of deadline and completion. If T is the date of the deadline, T is high priority(Orange), up to T-2 is medium priority(Purple), and anything upwards is low priority. (Gary)T+ anything will be considered overdue. (Red)  
FR 3.5c: Progress bar visual status

| Completion Status | Colour Code | Status Display |
| :---- | :---- | :---- |
| 0% | Gray bar | Yet to Start |
| 1-99% | Purple bar | In progress |
| 100% | Green Bar | Completed |
| \- | Orange bar | Failed. |
| \- | Red bar | Overdue |

FR 3.5d: If the task is already completed, it goes to the bottom of the page, and the priority will change to done.  
FR 3.5e: The CTA buttons will be as follows. The retake is only applicable for post-assessments.

| Button | Logic |
| :---- | :---- |
| Start | Yet to begin |
| Resume | In progress |
| Review | For notes/ Attempted and achieved expert status |
| Retake | Attempted but failed/Attempted and passed but novice/Attempted and passed but intermediate |

FR3.5f: There must be a filter with dropdown options By status \- Retake, Resume, Start, review Proficiency- Expert, Intermediate and novice. The student can select multiple filter options. If all the filters are removed- Then the entire task list displays.

Dependency: The Due date will be added while creating the course in the admin portal. Assessment proficiency levels and score thresholds will be added in the admin portal again while creating the course.

# **Skills Accomplished:**

Each assessment will be tagged to skill/skills and based on the scores achieved by the students, the skills will be categorised as expert, Intermediate, and novice.

FR 4:1- “You are 25% corporate ready.” This headline will appear above the pie chart in the skills accomplished section. “25%”- This number is the function of the number of skills in which the student has attained expert proficiency. 

FR 4.2- The proficiency levels should be displayed in a pie chart.   
FR 4.3- Beside the pie chart, the %age accomplishment the student holds in each level must be displayed.  Incase the student has not attained any proficiency level yet- this should be a gray chart.  
FR 4.4- There must be clickable arrow buttons beside the proficiency levels. Green for expert, yellow for intermediate, and orange for novice. On clicking these buttons. The student must be able to see the detailed skill page.

**Screen 1: On clicking the expert.**

FR4.5a-  There should be a progress bar for the no of skills in expert level (no of skills @ expert proficiency)/(no of skills in the entire course)  
FR 4.5b- The list of skills with expert proficiency will appear here with the CTA- View certificate. This certificate will have a static design template. Only the skill must change in each of these certificate. These are downloadable certificates that the student can publish on linkedin and so on as and then they complete.

FR4.5c- “25% corporate-ready. You're building momentum.  “ This must be the displacement. This %age is the %age of skills in which the student achieved expert proficiency.

**Screen 2: On clicking the Intermediate & Novice**

FR4.6a- “40% skills in Intermediate/Novice level. Push to Expert/Intermediate and stand out.” (%age of skills in which the student has intermediate proficiency) 

FR 4.6b- Under each chapter, there must be a message as to how much %age the student should score on that chapter to move to the next level. (This % is the threshold defined for each proficiency level)

FR4.6c- The CTA in this case must be Retake.

Dependency: The skills and thresholds for each proficiency level will be defined in the admin portal.

# **Content Quick Links:**

The functionality of this section is to allow the student to access the content pages for the sessions completed and upcoming in the given week. (from the course calendar given in the admin portal)

FR5.1- To the right corner, there should be a hyperlink to all content. If the student clicks this links → Core Skills → Module page → Chapter page → Assessment/notes page.

FR 5.2- Under the quick links- there will be a display of all the chapters completed in the given week. On clicking one of the chapters, the student will go to the Chapter page → Assessment/Notes page. 

FR5.3- If the student clicks on all content

5.3a- All the core skills will be tiles. Each tile will display the progress bar of its own. (Completed modules/Total no of modules for each core skill).   
5.3b- The tile must display the total duration of the core skill. This is a function of the time taken, defined for each assessment on the admin portal. 

5.3c- The student can only access the core skills linearly. As in, only after the student completes all the modules in core skill A, he can access core skill B. Till then, the tiles of other core skills will have a lock button on them. Chapters also must be linear.

5.3d- Visual status- the progress bar should be as follows:

| Completion Status | Colour Code | Status Display |
| :---- | :---- | :---- |
| 0% | Gray bar | Yet to Start |
| 1-99% | Purple bar | In progress |
| 100% | Green Bar | Completed |

5.3e- These tiles must be clickable, and clicking on each tile will take the student to the module page.

FR 5.4- The student clicked on the tile:

5.4a-  This page will have the list view of all the modules mapped under the core skill. The no of chapters and the no of assessments will also be shown on this page. 

5.4b- The CTA for this page will be view all. On clicking view all the student will see the list of chapters with the sub-sections in them with relevant CTA buttons. Each chapter will have a pre-KBA/SBA, post-KBA/SBA, Notes and practice under them.

KBA- knowledge-based assessment  
SBA- Skill- based assessment

| Section | CTA | Completion Logic |
| ----- | ----- | ----- |
| Pre- KBA/SBA | Take test | The attempt itself will be considered as completion |
| Post-KBA/SBA | Take test | The attempt itself will be considered as completion |
| Notes | View Notes | The student should have seen each page and only once he/she reach the end of the PPT/document, it will be considered complete |
| Practice | Take practice | Not applicable here. |

On completion, the CTA for the pre- and post-KBA and SBA will be retake test till the student attains proficieny level- expert.

5.4 C- There will be a progress bar on top of the module page (Completed chapters \+  Assessments)/ (Total no of chapters \+ assessments) (in the given module)

5.5- Assessments

| Type of assessments | Evaluation | Input Source | CTA |
| ----- | ----- | ----- | ----- |
| Multiple choice questions- MCQs | Predefined set of answers.  Automatic evaluation on clicking submit | Admin portal | Submit  |
| Text Assessments | Keyword-based evaluation.  Automatic evaluation on clicking submit. | Admin Portal | Submit |
| Video Assessments | Manual evaluation until the AI model is trained. Trainer receives submission, evaluates based on the rubric, and submits the score The student can see the score on the assessment page. | Trainer portal for now.Need clarity from tech on how AI can be plugged here. | Save draft Review draft Submit View results |

5.5a- The MCQs and Text assessments must be submitted in one shot. Resume is not an option and these tests will be timed. In the top right corner, a timer must be displayed. In case of any technical or network disruptions, the student must retake the assessment from the beginning. Partial submissions will not be an option and this will not count as an attempt. The duration will be defined on the admin portal. When the timer hits 00:00- the test gets auto submitted.

5.5b- For video assessments, the student can save the draft, review daft and submit at their own pace. These are not timed assessments. No pre-recorded videos can be uploaded. This is to avoid any kind of malpractice.

5.5 C- The technical requirements for assessments are that the student must keep the camera and audio on and should not be able to access any other tab. If the student accesses another tab. He will be logged out of Nunukkam, the test will go back to yet to start. If the student accesses another tab- A warning message must pop up \- “Stay on this tab or test will end”. The warning must pop for 2 tab switches. For the 3rd tab switch the student must be logged out. Violations logs must be captured. 

5.5d- The view results page will show the following data points.

Percentage, Proficiency level, Descriptive feedback for Video & text assessment, question wise breakdown for MCQs and the student’s ranking.

Student’s ranking to be in the template below:

1. Class- 11th position  
2. College- 19th position  
3. Nunukkam- 60th Position

The rankings will update in real time as each student submits his/her assessments.

Show ranking but add context.

* 1st out of 1 (more students pending)"  
* Acknowledges incomplete data

5.5 e- CTA- Retake the test if the proficiency level is not expert. If the expert, then the CTA will be view the certificate again.

Dependency: All the major deciding factors, like the type of assessment, duration, and threshold, will flow from the admin portal.

# **Badges:**

The badges are earned by the student in the class as the trainer marks them based on rubric in the session. The students in the winning team can see all their badges under this section. 

FR 6.1: Display all earned badges in grid format with badge icon, name, and date earned.  
FR 6.2: If no badges earned, show: "Badges earned in class activities will appear here."  
Dependency: Badge types, awarding logic, and trainer interface are detailed in Teacher Portal PRD.

# Menu\_Resume Draft

[https://whimsical.com/menu-flow-resume-builder-Cw9MLeFxQpxaLLBgmuE5nK](https://whimsical.com/menu-flow-resume-builder-Cw9MLeFxQpxaLLBgmuE5nK)

The main objective of this section in the menu is to help students draft his/her resume/CV.

User flow:

Clicks New draft → Summary section → Qualification → Interships → Work ex → Projects → Certifications → Skills → submit

FR 1- The mandatory fields are Summary, qualification, Skills other fields can be filled by the student as and where it is applicable.

FR 2- Summary will have an information icon on clicking which the student can see quick tips for a good summary. Input is a text box with max 250 characters.

FR 3- Qualifications  
3.1- The data can be pre-populated from the profile section.  
3.2- Upload buttons for marksheets & degree certificate. Mark sheets are mandatory. If the student has 6 semester- all of them must be combined into one pDf and uploaded here.  
An add more button for adding more qualifications on this list. Final CTA- Next info- require combined pdf.

FR4- Internships/Workex- Start date and end date to be captured. An upload button for certificates and a description box with max 150 characters. Add more button needed. (layout details and more fields refer to whimsical)

FR5- Projects- Title and description with max 200 characters and add more button. (layout details and more fields refer to whimsical)

FR6- Certifications- Title, issued by, validity, certificate upload option, add more (layout details and more fields refer to whimsical)

FR7- Skills- 

Hard skills& Languages known- The Student can input the skill and proficiency levels. Radio buttons for proficiency level and add more button.

Soft Skills-. Soft skills auto-populated from post-assessment proficiency levels (mapping defined in admin portal). Format: '\[Skill Name\] \- \[Proficiency Level\]'. If no assessments completed, show: 'Complete assessments to display soft skills.'

FR 8- Every page will have back to previous page button. 

FR 9- In the event of the student accidentally getting logged out, session time out or anycase the draft must be auto saved. Frequency- every 30 seconds.

FR 10- The drafts can be renamed, downloaded as pdf or edited.

Note: Trainer access to review student resumes will be added in Phase 2\. Phase 1 focuses on student resume creation and management only.

# Menu- Mentorship

On clicking the mentorship in the menu. ([https://whimsical.com/menu-flow-mentorship-23V6v8MEpVRd6iRWnivUYu](https://whimsical.com/menu-flow-mentorship-23V6v8MEpVRd6iRWnivUYu))

Under this menu option, the student can book a mentorship session with his trainer, access the notes for the previous sessions. 

FR1: The very first time the student opens this tab he will only see the CTA(Book a session).  
FR 2: After the first session, he will see both the past and upcoming sessions on the landing page.  
FR 3: If there are no upcoming sessions, the message should be “You have no upcoming sessions”  
FR 4: The CTAs on this page will be the view notes for the past session, join session & Cancel session for upcoming sessions and book a session for the overall page.  
FR 5: If the student wants to reschedule, he will have to cancel the session and book a fresh slot based on the trainer’s availability. The student must cancel the session atleast one hour before the scheduled time.   
FR 5.1: Once the student cancels the session, a notification must be pushed to all the other students assigned to the trainer regarding the free slot so they can book a session if they want. This notification must go only to those students with no upcoming sessions. The notification must have the CTA- Book a session that takes them to the mentorship booking page.  
FR 6: On clicking join session- the student will be directed to the third party meeting link integrated for now. In the future, there must be a provision where the session can be hosted on nunukkam itself.  
FR 7: The join session must be activated only 10 minutes before the session time.  
FR 8: For the past sessions: it should be a list view of the past session’s number, date & time. For upcoming sessions, it should show the date and time for the upcoming session.  
FR 9: A student cannot book more than one session at a time- meaning if there is an upcoming session for a future date & time, the student cannot book a new session. He can do it if he cancels the upcoming session in the schedule.  
FR 10: The student will receive a reminder via notifications one hour before the session and 10 minutes before the session. The notification will be along with the CTA- join the session. On clicking which the student will go the meeting room.

**On clicking Book a session:**

FR 1: There should be a dropdown for the student to choose the mentor for the session. For now, the mentor will be the trainer assigned to the student. In the future, if we want to add more mentors, the provision must be available.  
FR 2: On choosing the mentor, the student will select the date & slot and click on proceed.  
FR3: On clicking proceed he will see the message- “Your Mentorship has been booked with Ms. Trainer’s Name for 4 Oct 2025 at 5:00 PM.” The CTA button on this page must be go back to dashboard.  
FR4: In case the student is logged out in the middle of booking or if there is a network the session will not be scheduled.  
If no slots available, date picker shows all dates as disabled. Student can still browse but cannot select.

**On clicking cancel session:**

FR1: The reason for cancellation must be captured.  
FR 2: The reasons will be predefined with one of the options as “other”. If the student clicks other, a text box must appear where the student can type the reason manually.  
FR3: Once the student clicks proceed- he will see the message “Your Mentorship session with Ms. Trainer’s Name, scheduled for October 4, 2025, at 5:00 PM, has been cancelled.” The CTAs on this page will be book a session and go back to dashboard. On clicking book a session, the above-mentioned flow will be applicable.

List of reasons for cancellations:

Schedule conflict  
Not feeling well / Illness  
Personal emergency  
Need to reschedule fora  different time  
Technical issues (internet/device)  
Other

**On clicking view notes:** 

FR 1: On clicking view notes, the students will see the session date, time, discussion pointers and action items.  
FR 2: The discussion pointers & action items will be added by the trainer on the trainer portal.  
FR 3: The action items must be a checklist that the students can check off after completing it.   
FR 4: On checking it off, the action item must be striked through.  
FR 5: There must be an upload button, in case the student has to upload any write ups or files for the action items provided by the trainer.  
FR 6: The student must also be able to view the files he has uploaded.  
FR 7: Multiple file uploads must be allowed.  
FR 8: The final CTA on this page is Go back. On clicking go back the student will be taken back to the mentorship landing page.

Dependency: 

1. The trainer assignment for each batch happens on the admin portal.  
2. The trainer’s slots will be added by the trainer on the trainer portal.  
3. The trainer will add the meeting link while setting availability on the trainer portal.  
4. The trainer will also add the notes for the meeting on the trainer portal.

# Menu- leader board

On clicking the leaderboard in the hamburger menu, the student will be taken to the leaderboard where he can see his performance against that of the students in his college, classroom, and Nunukkam as a whole.  ([https://whimsical.com/menu-flow-leaderboard-AgaUECFYVxZ53a6dW8WPfJ](https://whimsical.com/menu-flow-leaderboard-AgaUECFYVxZ53a6dW8WPfJ))

Leaderboard logic-

The position is the leaderboard is a function of (assessment score and no of attempts taken by the student to attain a proficiency level). The best score of all the attempts will be taken into consideration.

Eg:   
Student A took a test. The test requires 70% threshold to attain the expert status. He got 65% in the first attempt. And 70% in the second attempt and 85% in the third attempt.  
Student B took the same test. He got 78% on the first attempt and 88% in the second attempt and got 82% in the third attempt. Student B will be above the student A in the leaderboard. Suppose there is a student C who scored 85% in the first attempt. The C comes first on the leaderboard, then B and then A.

| Example Analysis | Best Score | Attempts to Achieve Best Score | Rank |
| :---: | :---: | :---: | :---: |
| Student C | 85% (Attempt 1\) | 1 | 1st |
| Student B | 88% (Attempt 2\) | 2 | 2nd |
| Student A | 85% (Attempt 3\) | 3 | 3rd |

Your rank is based on:

How many attempts you needed (fewer \= better)  
Your best score (higher \= better, if attempts are equal)

While this logic works for individual assessments, the overall position is function of no of skills in expert level and no of attempts taken by the student to attain the expert level.  
Say there are 25 skills. Student A attained expert level in 3 skills in attempts 2,4 & 5\. Student B attained expert level in 4 skills in attempts 4, 3,2 & 6\. Though the no of attempts for student B are higher than A, the student attained expert proficicecy in more skills therefore student B will be at the top position than A. If the no of skills is tie breaker then the one with fewer attempts will be on the leaderboard.

| Student | Skills @ Expert | D: Total Attempts to Expert | Final Rank (A) |
| :---: | :---: | :---: | :---: |
| B | 4 | 4+3+2+6=15 | 1st |
| A | 3 | 2+4+5=11 | 3rd |
| D (Tie) | 3 | 5+3+1=9 | 2nd |

FR1: The leaderboard will have an info symbol that explains this leaderboard logic to the student.  
FR 2: There is a drop down filter with the options (In class, In college, At Nunukkam). The default filter option should be in class.  
FR 3: Once the student chooses the option it should be displayed with the no of students in the bracket. For eg: In class (30 students).   
FR 4: By default, we show the top 3 based on the filter option chosen. (Rank 1,2,3).   
Student A has rank 1 in class but rank 15 in college. Student B has rank 1 in college but rank 100 at nunukkam. For class filter- Student A is the top 1\. For College filter- Student B is top 1 and so on.  
FR 5: The CTA button view full leaderboard will allow the student to see the ranking of fellow classmates too.  
FR 6: On Top of the page, the student will see their ranking. Along with % of skills in Expert, Intermediate, and novice levels.  
FR 7: On clicking one’s own position. The student will be taken to the next screen. Where they can see their strengths & areas of improvement.

Strengths- All the skills in expert level.  
Areas of improvement \- All the skills in novice & intermediate level.

FR8: The leaderboard will show data only after the student takes the first assessment(post- kba/SBA). If the student accesses the leaderboard before taking any assessment. Then the display message- “Take the first assessment to unlock the leaderboard” must pop up.

FR9: The update frequency must be real-time.

