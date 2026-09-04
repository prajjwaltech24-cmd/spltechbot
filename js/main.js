/* =====================================================
   NEXORA STEM — Rich UI & Interactive Engine (Vanilla JS)
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Sticky Navbar on Scroll ---------- */
  const navbar = document.querySelector('.navbar-nexora');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  /* ---------- 2. Mobile Menu Toggle Animation ---------- */
  const toggler = document.querySelector('.navbar-toggler-custom');
  const navCollapse = document.getElementById('mainNav');

  if (toggler && navCollapse) {
    navCollapse.addEventListener('show.bs.collapse', () => toggler.classList.add('active'));
    navCollapse.addEventListener('hide.bs.collapse', () => toggler.classList.remove('active'));

    navCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
        }
      });
    });
  }

  /* ---------- 3. Smooth Scroll for In-Page Anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.length > 1 && !this.getAttribute('data-bs-toggle')) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 90;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- 4. Scroll Reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
      observer.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- 5. Back to Top Button ---------- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 6. Active Nav Link Detection ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nexora .nav-link, .navbar-nexora .dropdown-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      const dropdownParent = link.closest('.dropdown');
      if (dropdownParent) {
        const toggle = dropdownParent.querySelector('.dropdown-toggle');
        if (toggle) toggle.classList.add('active');
      }
    }
  });

  /* ---------- 7. Sample Learning Projects Filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (filterBtns.length && projectItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        projectItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-level') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  /* ---------- 8. Interactive Project Detail Modals ---------- */
  const projectData = {
    "LED Logic Circuits": {
      level: "Beginner",
      badgeClass: "project-badge-beginner",
      domain: "Electronics & Logic",
      objective: "Understand current, voltage, series/parallel circuit flow, and resistor values.",
      components: ["Solderless Breadboard", "Assorted 5mm LEDs", "220Ω & 10kΩ Resistors", "9V Battery Clip", "Push Buttons"],
      skills: ["Circuit Prototyping", "Ohm's Law Verification", "Troubleshooting Open/Short Circuits"],
      realWorld: "Automotive dashboard lighting, home appliance indicator panels, and power status circuits."
    },
    "Traffic Light Controller Model": {
      level: "Beginner",
      badgeClass: "project-badge-beginner",
      domain: "Automation & Microcontrollers",
      objective: "Program timed sequences, state delays, and logic loops mimicking real-world traffic intersections.",
      components: ["Microcontroller Board", "Red, Yellow, Green LEDs", "Current Limiting Resistors", "Jumper Wires"],
      skills: ["Digital Pin Output", "Timing Delays & State Machines", "Algorithmic Sequencing"],
      realWorld: "Smart city traffic management systems, railway signals, and factory assembly line alerts."
    },
    "Interactive Electronic Game": {
      level: "Beginner",
      badgeClass: "project-badge-beginner",
      domain: "Electronics & Game Logic",
      objective: "Build a reaction-speed or reflex wire buzzer test game using tactile inputs and audio-visual feedback.",
      components: ["Tactile Push Switches", "Piezo Buzzer", "LED Array", "Digital Logic / Microcontroller", "Conductive Wire"],
      skills: ["Interrupt Handling", "Player Input Timing", "Audio-Visual Feedback Loops"],
      realWorld: "Arcade consoles, physical fitness testing equipment, and industrial emergency stop triggers."
    },
    "Mini Weather Station": {
      level: "Beginner",
      badgeClass: "project-badge-beginner",
      domain: "Sensory Perception & Telemetry",
      objective: "Read real-time environmental metrics (temperature and humidity) and display live data on an LCD screen.",
      components: ["DHT11 Humidity/Temp Sensor", "16x2 I2C LCD Display", "Microcontroller Board", "Breadboard Harness"],
      skills: ["Sensor Signal Acquisition", "I2C Communication Bus", "Data Formatting on Displays"],
      realWorld: "Agricultural greenhouse monitors, indoor HVAC climate controllers, and weather forecasting nodes."
    },
    "Ambient Smart Light": {
      level: "Beginner",
      badgeClass: "project-badge-beginner",
      domain: "Sensor Automation",
      objective: "Design an automated dusk-to-dawn illumination system that responds to natural ambient light levels.",
      components: ["Light Dependent Resistor (LDR)", "10kΩ Resistor Divider", "NPN Transistor / Microcontroller", "High-Lumen LED"],
      skills: ["Analog Voltage Dividing", "Threshold Calibration", "Automated Load Switching"],
      realWorld: "Municipal street lights, smartphone auto-brightness sensors, and solar path lights."
    },
    "Obstacle Avoiding Robot": {
      level: "Intermediate",
      badgeClass: "project-badge-intermediate",
      domain: "Robotics & Autonomous Navigation",
      objective: "Construct a motorized wheeled rover that scans continuous distance signals and steers around barriers autonomously.",
      components: ["HC-SR04 Ultrasonic Sensor", "L298N Motor Driver", "Dual DC Gear Motors", "2WD Chassis", "Microcontroller Board"],
      skills: ["Ultrasonic Time-of-Flight", "Differential Steering Geometry", "Closed-Loop Reactive Control"],
      realWorld: "Autonomous robotic vacuum cleaners, warehouse transport rovers (AGVs), and robotic lawnmowers."
    },
    "Bluetooth-Controlled Robot": {
      level: "Intermediate",
      badgeClass: "project-badge-intermediate",
      domain: "Wireless Communication & Mechanics",
      objective: "Establish wireless serial communication to drive a robotic chassis from a custom smartphone dashboard.",
      components: ["HC-05 Bluetooth Module", "H-Bridge Motor Driver", "2WD/4WD Rover Chassis", "Rechargeable Li-Ion Battery"],
      skills: ["UART Serial Protocol", "Command Parsing", "PWM Motor Speed Regulation"],
      realWorld: "Remote bomb disposal robots, planetary exploration rovers, and teleoperated inspection machines."
    },
    "Contactless Smart Dustbin": {
      level: "Intermediate",
      badgeClass: "project-badge-intermediate",
      domain: "Smart Hygiene & Actuators",
      objective: "Construct an automated waste receptacle using infrared proximity sensing and servo-driven lid opening.",
      components: ["Ultrasonic or Infrared Sensor", "SG90 Micro Servo Motor", "Microcontroller Board", "Mechanical Pivot Arm"],
      skills: ["Servo Angle Control (0°–180°)", "Contactless Proximity Triggering", "Low-Power Idle Sleep"],
      realWorld: "Hospital sanitary waste systems, automated airport doors, and touchless food service dispensers."
    },
    "Automatic Plant Watering System": {
      level: "Intermediate",
      badgeClass: "project-badge-intermediate",
      domain: "Agricultural IoT & Automation",
      objective: "Monitor volumetric soil moisture content and activate a submersible 5V water pump automatically.",
      components: ["Capacitive Soil Moisture Probe", "5V Relay Module", "Submersible Water Pump", "Silicone Tubing"],
      skills: ["Analog Resistance Calibration", "High-Current Relay Isolation", "Closed-Loop Irrigation Cycles"],
      realWorld: "Precision agriculture drip systems, urban vertical farming, and smart botanical gardens."
    },
    "High-Speed Line-Following Robot": {
      level: "Intermediate",
      badgeClass: "project-badge-intermediate",
      domain: "Precision Control & Robotics",
      objective: "Navigate complex curved tracks using infrared reflectance arrays and closed-loop algorithmic correction.",
      components: ["Multi-Channel IR Sensor Bar", "Dual High-RPM Gearmotors", "Motor Driver Shield", "Low-Center Chassis"],
      skills: ["Infrared Reflectance Contrast", "PID (Proportional-Integral-Derivative) Logic", "High-Speed Dynamic Balancing"],
      realWorld: "Automated logistics rovers inside Amazon distribution centers and factory magnetic guide-strip carts."
    },
    "AI Real-Time Object Detection": {
      level: "Advanced",
      badgeClass: "project-badge-advanced",
      domain: "Computer Vision & Edge AI",
      objective: "Deploy lightweight vision models on single-board computers to identify items, faces, and classroom objects.",
      components: ["Single-Board Computer (Raspberry Pi / Jetson)", "HD USB Camera", "OpenCV & TensorFlow Lite Pipeline"],
      skills: ["Bounding Box Coordinates", "Model Inference on Video Streams", "Python Machine Learning APIs"],
      realWorld: "Self-driving car pedestrian detection, automated retail checkout, and security surveillance systems."
    },
    "Autonomous Maze-Solving Robot": {
      level: "Advanced",
      badgeClass: "project-badge-advanced",
      domain: "Pathfinding Algorithms & Robotics",
      objective: "Integrate multi-directional IR sensor arrays and wall-following algorithms to calculate shortest path solutions.",
      components: ["Triple Ultrasonic / ToF Laser Ranging Sensors", "Encoder Motors", "Microcontroller Board", "Precision Chassis"],
      skills: ["Flood-Fill & Wall-Following Algorithms", "Dead Reckoning & Odometry", "Maze Coordinate Mapping"],
      realWorld: "Search-and-rescue search robots in collapsed structures, subterranean tunnel inspection bots."
    },
    "Cloud IoT Environmental Monitor": {
      level: "Advanced",
      badgeClass: "project-badge-advanced",
      domain: "Connected IoT & Cloud Analytics",
      objective: "Publish live air quality (CO2/VOC), temperature, and barometric telemetry to cloud dashboards for live graph analysis.",
      components: ["ESP32 Wi-Fi/Bluetooth MCU", "BME280 / MQ-135 Gas Sensor", "OLED I2C Display", "Cloud MQTT Broker"],
      skills: ["Wi-Fi Networking & MQTT Protocol", "JSON Data Serialization", "REST APIs & Cloud Data Visualization"],
      realWorld: "Smart city pollution mapping, industrial safety sensors, and climate change research stations."
    },
    "Smart Campus Automation System": {
      level: "Advanced",
      badgeClass: "project-badge-advanced",
      domain: "Building Management Systems (BMS)",
      objective: "Control multi-relay classroom circuits responding to ambient temperature, occupancy PIR sensors, and scheduling clocks.",
      components: ["4-Channel Optocoupled Relay Board", "PIR Motion Sensor", "RTC (Real-Time Clock)", "ESP32 MCU"],
      skills: ["Optocoupler Safety Isolation", "Mains Load Handling Principles", "Event-Driven State Architecture"],
      realWorld: "Smart energy-efficient school buildings, corporate office climate control, and green architecture."
    },
    "AI-Powered Robotic Sorting Arm": {
      level: "Advanced",
      badgeClass: "project-badge-advanced",
      domain: "Robotics Kinematics & Computer Vision",
      objective: "Combine optical camera inference with multi-axis inverse kinematics to categorize objects and sort them into bins.",
      components: ["4-DOF Robotic Arm with Gripper", "Overhead Camera Module", "High-Torque Metal Gear Servos", "Edge AI Controller"],
      skills: ["Inverse Kinematics (Trigonometry)", "Spatial Coordinate Transformation", "AI Pipeline Integration with Actuators"],
      realWorld: "Pharmaceutical pill sorting, electronic waste recycling sorting, and industrial robotic pick-and-place lines."
    }
  };

  // Add click handler to sample project cards
  const projectCards = document.querySelectorAll('.sample-project-card');
  projectCards.forEach(card => {
    card.classList.add('clickable-card');
    
    // Add visual hint badge if not present
    if (!card.querySelector('.project-view-hint')) {
      const hint = document.createElement('div');
      hint.className = 'project-view-hint';
      hint.innerHTML = '<span>Explore Prototype Specs</span> <i class="bi bi-arrow-up-right"></i>';
      card.querySelector('.project-card-body')?.appendChild(hint);
    }

    card.addEventListener('click', function () {
      const titleEl = card.querySelector('h4');
      const title = titleEl ? titleEl.innerText.trim() : '';
      const data = projectData[title];

      if (data) {
        showProjectModal(title, data);
      }
    });
  });

  function showProjectModal(title, data) {
    let modalEl = document.getElementById('projectDetailModal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.className = 'modal fade';
      modalEl.id = 'projectDetailModal';
      modalEl.setAttribute('tabindex', '-1');
      modalEl.setAttribute('aria-hidden', 'true');
      document.body.appendChild(modalEl);
    }

    const componentsList = data.components.map(c => `<li class="d-flex align-items-center gap-2"><i class="bi bi-cpu text-primary-custom"></i> ${c}</li>`).join('');
    const skillsList = data.skills.map(s => `<li class="d-flex align-items-center gap-2"><i class="bi bi-check2-circle text-success"></i> ${s}</li>`).join('');

    modalEl.innerHTML = `
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content rounded-4 border-0 shadow-lg">
          <div class="modal-header border-0 pb-0 pt-4 px-4 px-md-5">
            <div>
              <span class="${data.badgeClass} d-inline-block mb-1">${data.level} Project Prototype</span>
              <h3 class="modal-title font-display fw-bold text-navy mt-1">${title}</h3>
              <small class="text-slate fw-semibold"><i class="bi bi-folder2-open text-primary-custom me-1"></i> Domain: ${data.domain}</small>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body px-4 px-md-5 py-4">
            <div class="p-3 bg-soft rounded-3 border mb-4">
              <strong class="text-navy d-block mb-1"><i class="bi bi-bullseye text-primary-custom me-1"></i> Core Learning Objective:</strong>
              <p class="small text-slate mb-0">${data.objective}</p>
            </div>
            
            <div class="row g-4 mb-4">
              <div class="col-md-6">
                <h6 class="font-display fw-bold text-navy mb-2"><i class="bi bi-tools text-primary-custom me-1"></i> Hardware Components Used:</h6>
                <ul class="list-unstyled vstack gap-2 small text-slate mb-0">
                  ${componentsList}
                </ul>
              </div>
              <div class="col-md-6">
                <h6 class="font-display fw-bold text-navy mb-2"><i class="bi bi-mortarboard text-success me-1"></i> Engineering Skills Gained:</h6>
                <ul class="list-unstyled vstack gap-2 small text-slate mb-0">
                  ${skillsList}
                </ul>
              </div>
            </div>

            <div class="p-3 rounded-3 bg-white border">
              <strong class="text-navy small d-block mb-1"><i class="bi bi-globe-americas text-primary-custom me-1"></i> Real-World Industrial Application:</strong>
              <small class="text-slate">${data.realWorld}</small>
            </div>

            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-4 pt-2 border-top">
              <small class="text-slate fst-italic">Students build, code, and troubleshoot this project step-by-step.</small>
              <a href="contact.html" class="btn btn-primary btn-sm-custom">
                Book a Demo to See This Live <i class="bi bi-arrow-right ms-1"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  }

  /* ---------- 9. Interactive STEM Lab Solution Planner / Calculator ---------- */
  const plannerGrade = document.getElementById('plannerGrade');
  const plannerStudents = document.getElementById('plannerStudents');
  const plannerFocus = document.getElementById('plannerFocus');
  const plannerTrainer = document.getElementById('plannerTrainer');

  if (plannerGrade && plannerStudents && plannerFocus && plannerTrainer) {
    const calcStations = document.getElementById('calcStations');
    const calcKits = document.getElementById('calcKits');
    const calcCapacity = document.getElementById('calcCapacity');
    const calcSessions = document.getElementById('calcSessions');
    const calcTimeline = document.getElementById('calcTimeline');

    function updatePlanner() {
      const students = parseInt(plannerStudents.value, 10) || 200;
      const grade = plannerGrade.value;
      const focus = plannerFocus.value;
      const trainer = plannerTrainer.value;

      // Calculations
      let stations = Math.min(16, Math.max(6, Math.round(students / 35)));
      let kits = stations * 2;
      let capacityPerSession = stations * 3;
      let weeklySessions = Math.max(2, Math.ceil(students / (capacityPerSession * 2)));
      let setupWeeks = focus === 'hybrid' ? '3 to 4 Weeks' : '2 to 3 Weeks';

      if (calcStations) calcStations.innerText = `${stations} Workstations`;
      if (calcKits) calcKits.innerText = `${kits} Hardware Kits`;
      if (calcCapacity) calcCapacity.innerText = `${capacityPerSession} Students`;
      if (calcSessions) calcSessions.innerText = `${weeklySessions} Sessions/wk`;
      if (calcTimeline) calcTimeline.innerText = setupWeeks;
    }

    [plannerGrade, plannerStudents, plannerFocus, plannerTrainer].forEach(control => {
      control.addEventListener('input', updatePlanner);
      control.addEventListener('change', updatePlanner);
    });

    updatePlanner();

    // "Apply Blueprint to Demo Form" button
    const applyBlueprintBtn = document.getElementById('applyBlueprintBtn');
    if (applyBlueprintBtn) {
      applyBlueprintBtn.addEventListener('click', function () {
        const gradeText = plannerGrade.options[plannerGrade.selectedIndex].text;
        const studentsText = plannerStudents.value + ' students';
        const focusText = plannerFocus.options[plannerFocus.selectedIndex].text;
        
        // Open modal
        const demoModalEl = document.getElementById('demoModal');
        if (demoModalEl) {
          const modal = bootstrap.Modal.getOrCreateInstance(demoModalEl);
          modal.show();

          setTimeout(() => {
            const textarea = demoModalEl.querySelector('textarea');
            if (textarea) {
              textarea.value = `Custom Lab Blueprint Request:\n- Grade Level: ${gradeText}\n- Cohort Size: ${studentsText}\n- Lab Focus: ${focusText}\n- Recommended Workstations: ${calcStations?.innerText || ''}`;
            }
          }, 400);
        }
      });
    }
  }

  /* ---------- 10. Live FAQ Real-Time Search Filter ---------- */
  const faqSearchInput = document.getElementById('faqSearchInput');
  const faqItems = document.querySelectorAll('#stemFaqAccordion .accordion-item');
  const faqCountEl = document.getElementById('faqResultCount');

  if (faqSearchInput && faqItems.length) {
    faqSearchInput.addEventListener('input', function () {
      const term = this.value.toLowerCase().trim();
      let matchedCount = 0;

      faqItems.forEach(item => {
        const text = item.innerText.toLowerCase();
        if (!term || text.includes(term)) {
          item.style.display = 'block';
          matchedCount++;
          if (term.length > 2) {
            // Auto open matching items when search is specific
            const collapseEl = item.querySelector('.accordion-collapse');
            if (collapseEl) {
              bootstrap.Collapse.getOrCreateInstance(collapseEl).show();
            }
          }
        } else {
          item.style.display = 'none';
        }
      });

      if (faqCountEl) {
        if (term) {
          faqCountEl.innerText = `Showing ${matchedCount} of ${faqItems.length} questions`;
          faqCountEl.style.display = 'block';
        } else {
          faqCountEl.style.display = 'none';
        }
      }
    });
  }

  /* ---------- 11. Form Validation with Reference ID & Storage ---------- */
  document.querySelectorAll('.needs-validation').forEach(form => {
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          const original = btn.innerHTML;
          btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Submitting...';
          btn.disabled = true;

          setTimeout(() => {
            const refNumber = 'NX-STEM-' + Math.floor(1000 + Math.random() * 9000);
            
            // Insert confirmation banner
            let banner = form.querySelector('.submission-banner');
            if (!banner) {
              banner = document.createElement('div');
              banner.className = 'submission-banner';
              form.appendChild(banner);
            }

            banner.innerHTML = `
              <i class="bi bi-check-circle-fill text-success fs-3 flex-shrink-0"></i>
              <div>
                <strong class="text-navy d-block">Demo Request Submitted Successfully!</strong>
                <span class="small text-slate">Your enquiry reference is <strong>#${refNumber}</strong>. Our school partnership coordinator will contact your institution within 24 hours to schedule the demonstration.</span>
              </div>
            `;

            btn.innerHTML = 'Enquiry Sent ✓';
            setTimeout(() => {
              btn.innerHTML = original;
              btn.disabled = false;
              form.reset();
              form.classList.remove('was-validated');
            }, 3000);
          }, 800);
        }
      }
      form.classList.add('was-validated');
    }, false);
  });

});
