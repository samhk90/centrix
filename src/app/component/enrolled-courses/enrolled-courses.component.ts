import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule,Router } from '@angular/router';
// Mock data interface for type safety
interface Artifact {
  type: string;
  name: string;
  url: string;
}

interface Topic {
  title: string;
  type: string;
  completed: boolean;
  isPlaying?: boolean;
  videoUrl?: string;
  duration?: string;
  artifacts?: Artifact[];
}

interface Section {
  title: string;
  progress: number;
  isExpanded: boolean;
  topics: Topic[];
}

interface Course {
  id: string;
  title: string;
  progress: number;
  courseCategory: string;
  courseDuration: string;
  sections: Section[];
  assessmentEligible: boolean;
  requiredProgressForAssessment: number;
}

@Component({
  selector: 'app-enrolled-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enrolled-courses.component.html',
  styleUrl: './enrolled-courses.component.scss'
})
export class EnrolledCoursesComponent implements OnInit {
  // Mock data for demonstration
  allEnrolledCourses: Course[] = [];
  enrolledCourses: Course[] = [];
  courseId: string | null = null;
  currentVideo: Topic | null = null;
  allSectionsExpanded: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Initialize with mock data
    this.initializeMockData();
    
    // Get the course ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id');
      
      if (this.courseId) {
        // Filter to show only the selected course
        this.enrolledCourses = this.allEnrolledCourses.filter(course => course.id === this.courseId);
        
        // Auto-select the first video
        if (this.enrolledCourses.length > 0) {
          for (const section of this.enrolledCourses[0].sections) {
            if (section.topics.length > 0) {
              const videoTopic = section.topics.find(t => t.type === 'video');
              if (videoTopic) {
                this.currentVideo = videoTopic;
                section.isExpanded = true;
                break;
              }
            }
          }
        }
      } else {
        // Show all enrolled courses if no ID is specified
        this.enrolledCourses = [...this.allEnrolledCourses];
      }
    });
  }

  /**
   * Initialize mock data for the component
   */
  private initializeMockData(): void {
    this.allEnrolledCourses = [
      {
        id: '1',
        title: 'Modern JavaScript',
        progress: 75,
        courseCategory: 'Programming',
        courseDuration: '30 hours',
        sections: [
          {
            title: 'Getting Started',
            progress: 100,
            isExpanded: true,
            topics: [
              {
                title: 'Course Overview',
                type: 'video',
                completed: true,
                isPlaying: false,
                videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
                duration: '10:15',
                artifacts: [
                  {
                    type: 'pdf',
                    name: 'JavaScript Syllabus',
                    url: 'assets/docs/js-syllabus.pdf'
                  },
                  {
                    type: 'doc',
                    name: 'Course Notes',
                    url: 'assets/docs/js-notes.doc'
                  }
                ]
              },
              {
                title: 'Setting Up Development Environment',
                type: 'reading',
                completed: true,
                duration: '15:00',
                artifacts: [
                  {
                    type: 'pdf',
                    name: 'Setup Guide',
                    url: 'assets/docs/setup-guide.pdf'
                  }
                ]
              }
            ]
          },
          {
            title: 'JavaScript Fundamentals',
            progress: 75,
            isExpanded: false,
            topics: [
              {
                title: 'Variables and Data Types',
                type: 'video',
                completed: true,
                isPlaying: false,
                videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
                duration: '12:30',
                artifacts: []
              },
              {
                title: 'Functions and Scope',
                type: 'video',
                completed: true,
                isPlaying: false,
                videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
                duration: '15:45',
                artifacts: [
                  {
                    type: 'pdf',
                    name: 'Functions Cheatsheet',
                    url: 'assets/docs/functions.pdf'
                  }
                ]
              },
              {
                title: 'Conditional Statements',
                type: 'video',
                completed: false,
                isPlaying: false,
                videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
                duration: '08:20',
                artifacts: []
              },
              {
                title: 'JavaScript Fundamentals Quiz',
                type: 'quiz',
                completed: false,
                duration: '20:00',
                artifacts: []
              }
            ]
          },
          {
            title: 'Advanced JavaScript',
            progress: 30,
            isExpanded: false,
            topics: [
              {
                title: 'Closures and Prototypes',
                type: 'video',
                completed: false,
                isPlaying: false,
                videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
                duration: '18:10',
                artifacts: []
              },
              {
                title: 'Asynchronous JavaScript',
                type: 'video',
                completed: false,
                isPlaying: false,
                videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
                duration: '22:05',
                artifacts: []
              }
            ]
          }
        ],
        assessmentEligible: true,
        requiredProgressForAssessment: 60
      },
      // ...other courses from your existing data...
    ];
  }

  /**
   * Toggle the expanded state of a section
   */
  toggleSection(section: Section): void {
    section.isExpanded = !section.isExpanded;
    
    // Update allSectionsExpanded flag
    this.updateAllSectionsExpandedState();
  }
  
  /**
   * Toggle all sections' expanded state
   */
  toggleAllSections(): void {
    this.allSectionsExpanded = !this.allSectionsExpanded;
    
    if (this.enrolledCourses.length > 0) {
      this.enrolledCourses[0].sections.forEach(section => {
        section.isExpanded = this.allSectionsExpanded;
      });
    }
  }
  
  /**
   * Update the allSectionsExpanded flag
   */
  private updateAllSectionsExpandedState(): void {
    if (this.enrolledCourses.length > 0) {
      const allExpanded = this.enrolledCourses[0].sections.every(s => s.isExpanded);
      this.allSectionsExpanded = allExpanded;
    }
  }
  
  /**
   * Play a specific video/topic
   */
  playVideo(topic: Topic): void {
    // Reset current video if there is one
    if (this.currentVideo) {
      this.currentVideo.isPlaying = false;
    }
    
    this.currentVideo = topic;
    
    if (topic.type === 'video') {
      topic.isPlaying = true;
    }
  }
  
  /**
   * Toggle the completion status of a topic
   */
  toggleCompleteStatus(topic: Topic): void {
    topic.completed = !topic.completed;
    
    // Update section and course progress
    if (this.enrolledCourses.length > 0) {
      this.updateProgress(this.enrolledCourses[0]);
    }
  }
  
  /**
   * Update progress for a course and its sections
   */
  private updateProgress(course: Course): void {
    // Update section progress
    course.sections.forEach(section => {
      const completedTopics = section.topics.filter(t => t.completed).length;
      section.progress = Math.round((completedTopics / section.topics.length) * 100);
    });
    
    // Update overall course progress
    const totalTopics = course.sections.reduce((sum, section) => sum + section.topics.length, 0);
    const totalCompleted = course.sections.reduce((sum, section) => 
      sum + section.topics.filter(t => t.completed).length, 0);
    
    course.progress = Math.round((totalCompleted / totalTopics) * 100);
    
    // Check if assessment is now eligible
    course.assessmentEligible = course.progress >= course.requiredProgressForAssessment;
  }
  
  /**
   * Check if there is a next video to play
   */
  hasNextVideo(): boolean {
    if (!this.currentVideo || this.enrolledCourses.length === 0) return false;
    
    const course = this.enrolledCourses[0];
    let foundCurrent = false;
    
    for (const section of course.sections) {
      for (const topic of section.topics) {
        if (foundCurrent && topic.type === 'video') {
          return true;
        }
        
        if (topic === this.currentVideo) {
          foundCurrent = true;
        }
      }
    }
    
    return false;
  }
  
  /**
   * Play the next video in sequence
   */
  playNextVideo(): void {
    if (!this.currentVideo || this.enrolledCourses.length === 0) return;
    
    const course = this.enrolledCourses[0];
    let foundCurrent = false;
    
    for (const section of course.sections) {
      for (const topic of section.topics) {
        if (foundCurrent && topic.type === 'video') {
          // Found the next video
          this.playVideo(topic);
          
          // Expand the section if not already expanded
          section.isExpanded = true;
          
          return;
        }
        
        if (topic === this.currentVideo) {
          foundCurrent = true;
        }
      }
    }
  }

  /**
   * Returns the appropriate Font Awesome icon class based on artifact type
   */
  getArtifactIcon(type: string): string {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'fa-file-pdf-o';
      case 'doc':
      case 'docx':
        return 'fa-file-word-o';
      case 'xls':
      case 'xlsx':
        return 'fa-file-excel-o';
      case 'ppt':
      case 'pptx':
        return 'fa-file-powerpoint-o';
      case 'zip':
      case 'rar':
        return 'fa-file-archive-o';
      case 'image':
      case 'jpg':
      case 'png':
        return 'fa-file-image-o';
      case 'video':
      case 'mp4':
        return 'fa-file-video-o';
      case 'audio':
      case 'mp3':
        return 'fa-file-audio-o';
      case 'link':
        return 'fa-external-link';
      default:
        return 'fa-file-o';
    }
  }
  
  /**
   * Returns the appropriate icon for the topic type
   */
  getTopicTypeIcon(type: string): string {
    switch (type.toLowerCase()) {
      case 'video':
        return 'fa-play-circle';
      case 'quiz':
        return 'fa-question-circle';
      case 'reading':
        return 'fa-book';
      case 'assignment':
        return 'fa-pencil';
      case 'discussion':
        return 'fa-comments';
      default:
        return 'fa-file-o';
    }
  }
  navigateToAssessment(): void {

      this.router.navigate(['/instructions']);
  }
}
