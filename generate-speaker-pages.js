import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Speaker data from the website
const speakers = [
  {
    name: 'Stephen Hay',
    talkTitle: 'MC',
    talkDate: 'June 5, 2025',
    talkTime: 'all day',
    talkDescription: 'Stephen Hay is a creative director, designer, author, and speaker with a passion for code, design processes, and systems thinking. With a background in graphic design and fine art, he became an early advocate for responsive design, design systems, and using CSS as a design tool.',
    bio: 'Stephen is the author of Responsive Design Workflow, co-author of Smashing Book #3, writer of countless articles on design topics, and has spoken at industry conferences worldwide. Stephen is always exploring smarter ways to work and create.'
  },
  {
    name: 'Adam Argyle',
    talkTitle: 'Level up your scroll UX',
    talkDate: 'June 5, 2025',
    talkTime: '09:30',
    talkDescription: 'Slide by slide, CSS feature by feature, we\'ll incrementally enhance and craft a rad scroll experience. Normally a pain in the box; styling and managing scroll across touch, keyboard, mouse and more PLUS juggling each operating system\'s slightly different affordances, can be daunting.',
    bio: 'Adam is a bright, passionate, punk engineer with an adoration for the web who prefers using his skills for best in class UI/UX and empowering those around him. He\'s worked at small and large companies, and built an app for pretty much every screen (or voice). He is capable of over-engineering, but spends lots of brain power not to. Loves CSS, loves JS, loves great UX.'
  },
  {
    name: 'John Allsopp',
    talkTitle: 'A Dao of CSS',
    talkDate: 'June 5, 2025',
    talkTime: '10:55',
    talkDescription: 'What if we stopped trying to control the web—and started working with it? In this talk, I return to A Dao of Web Design, an essay I wrote 25 years ago, to look again—this time through the lens of CSS.',
    bio: 'John Allsopp has been working on the Web for nearly 30 years. He\'s been responsible for innovative developer tools such as Style Master and X-Ray, and his ideas formed the foundation for Typekit, now Adobe Fonts, and the entire concept of Responsive Web Design.'
  },
  {
    name: 'Miriam Suzanne',
    talkTitle: 'Is Sass Dead Yet? CSS Mixins & Functions &c.',
    talkDate: 'June 5, 2025',
    talkTime: '11:50',
    talkDescription: 'Sass has inspired new developments in CSS for over a decade – from variables to nesting, and now author-defined CSS mixins and functions. As these features make the jump from Sass to CSS, they tend to change in significant ways.',
    bio: 'Miriam is an author, artist, developer, and open web advocate. She\'s a co-founder of OddBird, Invited Expert with the W3C CSS Working Group, and member of the Sass core team.'
  },
  {
    name: 'Cyd Stumpel',
    talkTitle: 'CSS tried to come for my job',
    talkDate: 'June 5, 2025',
    talkTime: '13:55',
    talkDescription: 'CSS has gotten more powerful in terms of layout for the last couple of years, but lately, it\'s also been creeping into places that have traditionally relied heavily on Javascript.',
    bio: 'Cyd is a freelance creative developer and part time teacher at the Amsterdam University of Applied Sciences. She creates accessible, award winning websites for everyone; from large organisations like WeTransfer and Amnesty International to creative agencies and freelancers.'
  },
  {
    name: 'Brecht De Ruyte',
    talkTitle: 'Select it! Styling new HTML UI capabilities',
    talkDate: 'June 5, 2025',
    talkTime: '14:50',
    talkDescription: 'We are getting spoiled with increased UI capabilities, partially thanks to the efforts from the W3C community group Open UI. One of those features is the customizable select.',
    bio: 'Brecht De Ruyte is a self-taught front-end developer located in Belgium with a passion for UX and Design. During the day you can find him working at iO, a full service agency. Besides that, he is also a Google Developer Expert, Smashing Magazine writer and blog owner of utilitybend.com.'
  },
  {
    name: 'Rachel Andrew',
    talkTitle: 'Multicol and fragmentation',
    talkDate: 'June 5, 2025',
    talkTime: '16:15',
    talkDescription: 'Rachel will be discussing multicolumn layout and fragmentation in CSS.',
    bio: 'Rachel works for Google as content lead for Chrome Developer Relations, publishing to web.dev and developer.chrome.com. She is a front and back-end web developer, speaker, and author or co-author of 22 books including The New CSS Layout.'
  },
  {
    name: 'Brad Frost',
    talkTitle: 'Design Token Architecture',
    talkDate: 'June 5, 2025',
    talkTime: '17:10',
    talkDescription: 'Brad and Ian will give an Advanced Design Tokens workshop on Wednesday 4th of June, the day before the conference.',
    bio: 'Brad Frost is a design system consultant, web designer & developer, speaker, writer, teacher, musician, and artist located in beautiful Pittsburgh, PA. He helps people establish & evolve design systems, establish more collaborative workflows, and design & build software together.'
  },
  {
    name: 'Ian Frost',
    talkTitle: 'Design Token Architecture',
    talkDate: 'June 5, 2025',
    talkTime: '17:10',
    talkDescription: 'Brad and Ian will give an Advanced Design Tokens workshop on Wednesday 4th of June, the day before the conference.',
    bio: 'Ian Frost is a front-end architect, technical lead, and consultant passionate about helping developers level up their skills. Over the last decade, Ian has developed many design systems in a variety of technologies, including Web Components, React, Angular, and Vue.'
  },
  {
    name: 'Bramus van Damme',
    talkTitle: 'MC',
    talkDate: 'June 6, 2025',
    talkTime: 'all day',
    talkDescription: 'Bramus will be MC for day 2 of CSS Day 2025.',
    bio: 'Bramus is a web developer from Belgium. He\'s part of the Chrome Developer Relations team at Google, focusing on CSS, Web UI, and DevTools. From the moment he discovered view-source at the age of 14 (way back in 1997), he fell in love with the web and has been tinkering with it ever since.'
  },
  {
    name: 'Chris Coyier',
    talkTitle: 'Scope in CSS',
    talkDate: 'June 6, 2025',
    talkTime: '09:30',
    talkDescription: 'I hate to be the one to tell you but writing CSS is half thinking about scope. You don\'t always need them, but there are plenty of tools out there that help with scoping one way or another.',
    bio: 'Chris is a web designer and developer that tries to help other people get better at those things. He\'s the co-founder of CodePen, a social development environment for web designers and developers.'
  },
  {
    name: 'Ahmad Shadeed',
    talkTitle: 'Smart layouts',
    talkDate: 'June 6, 2025',
    talkTime: '10:55',
    talkDescription: 'Today is the best time to start learning how to use modern CSS features to build truly responsive components. Responsive design doesn\'t mean designing for the viewport anymore.',
    bio: 'Ahmad Shadeed is a UX designer and front-end developer from Tulkarm, Palestine, who enjoys tackling interesting design and development challenges. He has written extensively about CSS, accessibility, and RTL (right-to-left) styling.'
  },
  {
    name: 'Tim Nguyen',
    talkTitle: 'Form control styling',
    talkDate: 'June 6, 2025',
    talkTime: '11:50',
    talkDescription: 'Text inputs, checkboxes, radio buttons, sliders… Form controls have been part of the web since the beginning, but styling them can still feel like a battle.',
    bio: 'Tim is a WebKit engineer at Apple. His interest in web technology developed through years of web design and many contributions to Firefox\'s user interface. Those contributions led him eventually to hack on browser engines.'
  },
  {
    name: 'Amit Sheen',
    talkTitle: 'Building a Computer with CSS',
    talkDate: 'June 6, 2025',
    talkTime: '13:55',
    talkDescription: 'Ever wondered how a computer actually works? What a CPU is actually built of? And if it\'s possible to build one using only CSS? If so, this talk is for you.',
    bio: 'Amit is an experienced web developer, specializing in CSS, design systems, animations, and creative coding. He has a pathological curiosity and a constant desire to learn new things, and loves sharing his experience and explorations with the community.'
  },
  {
    name: 'Ana Rodrigues',
    talkTitle: 'Refactoring CSS',
    talkDate: 'June 6, 2025',
    talkTime: '14:50',
    talkDescription: 'In recent years, updates in CSS have given us many exciting possibilities for creating modern, dynamic web experiences. Yet, for many developers, the day-to-day reality often involves working within the constraints of legacy codebases.',
    bio: 'Ana works as a front-end developer at tech-for-good agency Hactar. She started coding as a teenager building fan sites, and has been working as a front-end developer for the last 12 years.'
  },
  {
    name: 'Hidde de Vries',
    talkTitle: '`display: green`; applying the web sustainability guidelines',
    talkDate: 'June 6, 2025',
    talkTime: '16:15',
    talkDescription: 'The tech sector has an elephant in the room: we use too much energy. In 2024, the World Bank estimated the internet to account for 1-4% of global greenhouse emissions, similar to aviation.',
    bio: 'Hidde is a freelance front-end, design systems and accessibility specialist (CPWA). He is also involved in the W3C\'s Open UI Community Group and Accessibility Guidelines Working Group.'
  },
  {
    name: 'Bruce Lawson',
    talkTitle: 'The goose and the common',
    talkDate: 'June 6, 2025',
    talkTime: '17:10',
    talkDescription: 'The web is at an inflection point. Big Tech owns the major platforms, the major browsers, the biggest websites, and carves the Web up between themselves.',
    bio: 'A veteran of the browser wars, many a standards skirmish and an accessibility apocalypse or two, Bruce now leverages synergies for Vivaldi browser.'
  }
]

// Function to generate speaker pages
function generateSpeakerPages() {
  const templatePath = join(__dirname, 'css-day', 'speakers', 'template.html')
  const template = readFileSync(templatePath, 'utf8')

  speakers.forEach(speaker => {
    const speakerSlug = speaker.name.toLowerCase().replace(/\s+/g, '-')
    const firstName = speaker.name.split(' ')[0].toLowerCase()
    
    let content = template
      .replace(/{ speaker name }/g, speaker.name)
      .replace(/{ speaker name replace spaces with dash }/g, speakerSlug)
      .replace(/{ first name }/g, firstName)
      .replace(/{ talk title }/g, speaker.talkTitle)
      .replace(/{ talk date }/g, speaker.talkDate)
      .replace(/{ talk time }/g, speaker.talkTime)
      .replace(/{ talk description }/g, speaker.talkDescription)
      .replace(/{ speaker bio }/g, speaker.bio)

    const outputPath = join(__dirname, 'css-day', 'speakers', `${speakerSlug}.html`)
    writeFileSync(outputPath, content)
    console.log(`Generated ${speakerSlug}.html`)
  })
}

// Run the generator
generateSpeakerPages()
