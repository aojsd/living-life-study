// Living Life Study - Quiz Data

const FILL_IN_THE_BLANK = [
  {
    id: 1,
    question: "Write down the three definitions of sin found in the New Testament.",
    points: 3,
    parts: [
      { label: "Definition 1", answer: "Lawlessness" },
      { label: "Definition 2", answer: "Knowing the good we ought to do and not doing it" },
      { label: "Definition 3", answer: "Everything that doesn't come from faith" }
    ]
  },
  {
    id: 2,
    question: "What are the five components of prayer?",
    points: 5,
    parts: [
      { label: "Component 1", answer: "Praise" },
      { label: "Component 2", answer: "Thanksgiving" },
      { label: "Component 3", answer: "Repentance" },
      { label: "Component 4", answer: "Intercession" },
      { label: "Component 5", answer: "Requests" }
    ]
  },
  {
    id: 3,
    question: "In regard to the books of the Bible:",
    points: 4,
    parts: [
      { label: "How many books are in the Old Testament?", answer: "39" },
      { label: "How many books are in the New Testament?", answer: "27" },
      { label: "When was the Old Testament completed?", answer: "400 BC" },
      { label: "When was the New Testament completed?", answer: "AD 90" }
    ]
  },
  {
    id: 4,
    question: "Write down the four different categories of the books of the Old Testament including where it starts from and ends.",
    points: 8,
    paired: true,
    parts: [
      { label: "Category 1 — Name", answer: "The Law" },
      { label: "Category 1 — Range", answer: "Genesis to Deuteronomy" },
      { label: "Category 2 — Name", answer: "History" },
      { label: "Category 2 — Range", answer: "Joshua to Esther" },
      { label: "Category 3 — Name", answer: "Wisdom Literature" },
      { label: "Category 3 — Range", answer: "Job to Song of Songs" },
      { label: "Category 4 — Name", answer: "Prophets" },
      { label: "Category 4 — Range", answer: "Isaiah to Malachi" }
    ]
  },
  {
    id: 5,
    question: "Write down the four different categories of the books of the New Testament including where it starts from and ends.",
    points: 8,
    paired: true,
    parts: [
      { label: "Category 1 — Name", answer: "The Gospels" },
      { label: "Category 1 — Range", answer: "Matthew to John" },
      { label: "Category 2 — Name", answer: "History" },
      { label: "Category 2 — Range", answer: "Acts" },
      { label: "Category 3 — Name", answer: "Letters/Epistles", altAnswers: ["Letters", "Epistles"] },
      { label: "Category 3 — Range", answer: "Romans to Jude" },
      { label: "Category 4 — Name", answer: "Prophetic book" },
      { label: "Category 4 — Range", answer: "Revelation" }
    ]
  },
  {
    id: 6,
    question: 'The New Testament defines who God is by using three phrases that say, "God is ____________." What are the three words that describe God?',
    points: 3,
    parts: [
      { label: "Word 1", answer: "Spirit" },
      { label: "Word 2", answer: "Light" },
      { label: "Word 3", answer: "Love" }
    ]
  },
  {
    id: 7,
    question: "How does the New Testament describe the triune God, God the Father, God the Son and God the Holy Spirit, in relation to us?",
    points: 3,
    parts: [
      { label: "God the Father — we are...", answer: "God's children" },
      { label: "God the Son — we are...", answer: "Christ's bride" },
      { label: "God the Holy Spirit — we are...", answer: "The Holy Spirit's temple" }
    ]
  },
  {
    id: 8,
    question: "In regard to Jesus Christ:",
    points: 9,
    parts: [
      { label: "Which tribe is He from? (Matthew 1:1)", answer: "Judah" },
      { label: "What is His birthplace? (Matthew 2:1)", answer: "Bethlehem" },
      { label: "What are His parents' names? (Matthew 1:18)", answer: "Mary and Joseph" },
      { label: "Where did He grow up? (Matthew 2:23)", answer: "Nazareth" },
      { label: "What was His profession? (Mark 6:3)", answer: "Carpenter" },
      { label: "What age did He begin His public ministry? (Luke 3:23)", answer: "30" },
      { label: "What place did He die? (John 19:17)", answer: "Golgotha" },
      { label: "Which place did He ascend to Heaven? (Acts 1:12)", answer: "Mount of Olives" },
      { label: "How many years did He do public ministry?", answer: "3" }
    ]
  },
  {
    id: 9,
    question: "Describe Israel during Jesus' time by dividing it into three parts and naming them.",
    points: 3,
    parts: [
      { label: "North", answer: "Galilee" },
      { label: "Middle", answer: "Samaria" },
      { label: "South", answer: "Judah" }
    ]
  },
  {
    id: 10,
    question: "Write down the famous people who lived during these time periods.",
    points: 4,
    parts: [
      { label: "BC 2000", answer: "Abraham" },
      { label: "BC 1500", answer: "Moses" },
      { label: "BC 1000", answer: "David" },
      { label: "BC or AD 0", answer: "Jesus" }
    ]
  },
  {
    id: 11,
    question: "Write down the names of Abraham's son, his grandson and three tribes out of the twelve tribes.",
    points: 5,
    parts: [
      { label: "Son", answer: "Isaac" },
      { label: "Grandson", answer: "Jacob" },
      { label: "Tribe 1 (any of the 12)", answer: "__tribe__" },
      { label: "Tribe 2 (any of the 12)", answer: "__tribe__" },
      { label: "Tribe 3 (any of the 12)", answer: "__tribe__" }
    ]
  }
];

const TWELVE_TRIBES = [
  "reuben", "judah", "levi", "simeon", "benjamin", "ephraim",
  "manasseh", "zebulun", "gad", "dan", "asher", "naphtali", "issachar"
];

const TRUE_FALSE = [
  { id: 1, statement: "The most important thing in Christian life is having the right relationship with God and neighbors. (Matthew 22:34-40)", answer: true },
  { id: 2, statement: "Just because you don't have good relationship with your neighbor doesn't mean you have bad relationship with God. (Matthew 22:39)", answer: false },
  { id: 3, statement: "The reason why Jesus died on the cross is for his sins as well as for ours. (Isaiah 53:6)", answer: false },
  { id: 4, statement: "We are not sinners because we sin. We sin because we are sinners. (Romans 1:28-31)", answer: true },
  { id: 5, statement: "The original meaning of confessing our sin is agreeing with God. (1 John 1:9)", answer: true },
  { id: 6, statement: "The core meaning of repentance is having a sorrowful heart for the sins we committed. (1 John 1:9)", answer: false },
  { id: 7, statement: "If we confess our sins, God forgives our sins but remembers them. (Hebrews 8:12)", answer: false },
  { id: 8, statement: "When we confess our sins, not only does God forgive our sins, He doesn't remember them anymore. (Hebrews 8:12)", answer: true },
  { id: 9, statement: "If we have truly repented, we should produce fruit in keeping with repentance. (Luke 3:8)", answer: true },
  { id: 10, statement: "When we repent, we just need to confess our sins before God. We don't have to ask for forgiveness from people that we sinned against or pay back any debt we owe. (Luke 3:8)", answer: false },
  { id: 11, statement: 'The person who used the word "New Covenant" which also means "New Testament" is Jeremiah.', answer: true },
  { id: 12, statement: 'The person who used the word "New Covenant" which also means "New Testament" is Isaiah.', answer: false },
  { id: 13, statement: "The right to become children of God has been given to those who get baptized and make their effort to live their life according to God's will. (John 1:13)", answer: false },
  { id: 14, statement: "Receiving Jesus means the same as believing in Jesus. (John 1:12)", answer: true },
  { id: 15, statement: "Even if you don't believe that Jesus died and rose from the dead, you will be saved if you receive him as your Lord and Savior. (Romans 10:9)", answer: false },
  { id: 16, statement: "In order for us to be saved we must believe in Jesus' resurrection. (Romans 10:9)", answer: true },
  { id: 17, statement: "There could be saved Christians who are not necessarily born again. (John 3:1-8)", answer: false },
  { id: 18, statement: "After we become Christians, we become born again through our effort to live a holy life. (John 3:1-8)", answer: false },
  { id: 19, statement: "A place where Jewish people gather together on Sabbath for worship is called synagogue.", answer: true },
  { id: 20, statement: "Those who don't have the assurance of salvation are not saved. (1 John 5:13)", answer: false },
  { id: 21, statement: "There could be people who are saved but don't have the assurance of salvation. (1 John 5:13)", answer: true },
  { id: 22, statement: "Because Jesus is holding onto our hands we can't lose our salvation. (John 10:28)", answer: true },
  { id: 23, statement: "When we let go of Jesus' hand after holding on to it for a while, we could lose our salvation. (John 10:28)", answer: false },
  { id: 24, statement: 'The "future salvation" refers to the salvation of our souls.', answer: false },
  { id: 25, statement: 'The "present salvation" refers to the salvation of our character.', answer: true },
  { id: 26, statement: "Adam and Eve died immediately after they disobeyed God by eating the fruit of the tree of the knowledge of good and evil.", answer: false },
  { id: 27, statement: "The reason why we must be holy is because God is holy. (1 Peter 1:15-16)", answer: true },
  { id: 28, statement: "Paying attention to our words and behavior is the most important thing in becoming a holy person.", answer: false },
  { id: 29, statement: "God gives us both the desire and the power to live the life that is according to His will. (Philippians 2:13)", answer: true },
  { id: 30, statement: "God gives us the desire to live the life that is according to His will. The power must come from us. (Philippians 2:13)", answer: false },
  { id: 31, statement: "The life that Christians live, they no longer live but Christ lives in them. (Galatians 2:20)", answer: true },
  { id: 32, statement: "If there is anyone that we hate even after we are saved, this means that we are not truly saved.", answer: false },
  { id: 33, statement: "Our spiritual maturity gets determined by how long we have been Christians. (1 Corinthians 3:1-3)", answer: false },
  { id: 34, statement: "Even if someone has been a Christian for a long time, has much spiritual experience and knows a lot about the Bible, if he is divisive and quarrels a lot, he is a spiritually immature person. (1 Corinthians 3:1-3)", answer: true },
  { id: 35, statement: "Husband and wife submit to each other. (Ephesians 5:22)", answer: false },
  { id: 36, statement: "The main reason why Christians must make submission as the foundation in their family, work and society is to maintain order.", answer: false },
  { id: 37, statement: "The most important reason why Jesus came into this world is to be served as the king of all nations. (Matthew 20:28)", answer: false },
  { id: 38, statement: "The true servant is doing whatever people tell him to do.", answer: false },
  { id: 39, statement: "We will never be exactly like Jesus until we die. (Philippians 3:12-14)", answer: true },
  { id: 40, statement: "If we are true Christians, after some time, we will be exactly like Jesus. (Philippians 3:12-14)", answer: false },
  { id: 41, statement: "The Bible is not written by men. It is directly written by God. (2 Peter 1:21)", answer: false },
  { id: 42, statement: "The Bible is God's Word but it is written by men. (2 Peter 1:21)", answer: true },
  { id: 43, statement: "More than being a practical and helpful book, the Bible is a book that describes the spiritual world. (2 Timothy 3:16)", answer: false },
  { id: 44, statement: "The synoptic gospels refer to Matthew, Luke and John.", answer: false },
  { id: 45, statement: "The main purpose of the prophets is to receive God's word in order to predict the future.", answer: false },
  { id: 46, statement: "Jesus grew up in Bethlehem. (Matthew 2:23)", answer: false },
  { id: 47, statement: "There is no difference between Christ and Messiah in meaning.", answer: true },
  { id: 48, statement: "Jesus was a fisherman by profession. (Mark 6:3)", answer: false },
  { id: 49, statement: "Jesus ascended to heaven on the Mount of Olives. (Acts 1:12)", answer: true },
  { id: 50, statement: "By dying on the cross for us, Jesus prepared a way not just for us to be forgiven of our sins but also to live for righteousness. (1 Peter 2:24)", answer: true },
  { id: 51, statement: "By dying on the cross for us, Jesus has paid the price for our sins but has not given us the power to overcome our sins. (1 Peter 2:24)", answer: false },
  { id: 52, statement: "The work of Jesus has ended with his death, resurrection and ascension. (Romans 8:34)", answer: false },
  { id: 53, statement: "The work of Jesus has not ended with his death, resurrection and ascension but is still continuing on right now. (Romans 8:34)", answer: true },
  { id: 54, statement: "Unlike his first coming, when Jesus comes for the second time, he will come in a way that everyone will see. (Matthew 24:30)", answer: true },
  { id: 55, statement: "When Jesus comes for the second time, he will come quietly so that only his people will recognize him. (Matthew 24:30)", answer: false },
  { id: 56, statement: "God's people must be baptized by the Holy Spirit after they receive Jesus and become saved. (Ephesians 4:30)", answer: false },
  { id: 57, statement: "Everyone who is saved has been baptized by the Holy Spirit. (Ephesians 4:30)", answer: true },
  { id: 58, statement: "Believers must continue to be filled with the Holy Spirit. (Ephesians 5:18)", answer: true },
  { id: 59, statement: "The fullness of the Holy Spirit happens only once in believer's lifetime. (Ephesians 5:18)", answer: false },
  { id: 60, statement: "Gentleness as one of the fruit of the Holy Spirit is doing whatever others ask us to do. (Galatians 5:22-23)", answer: false },
  { id: 61, statement: "Gentleness as one of the fruit of the Holy Spirit is not using power even when you have it. (Galatians 5:22-23)", answer: true },
  { id: 62, statement: "Kindness is a fruit of the Holy Spirit. (Galatians 5:22-23)", answer: true },
  { id: 63, statement: "Faithfulness as one of the fruit of the Holy Spirit is keeping your promise. (Galatians 5:22-23)", answer: true },
  { id: 64, statement: "The spiritual gifts are given to us primarily for our own spiritual growth. (1 Corinthians 12:7)", answer: false },
  { id: 65, statement: "The reason why spiritual gifts are given to us is for the common good. (1 Corinthians 12:7)", answer: true },
  { id: 66, statement: 'The Church is built upon Peter whom Jesus called the rock. (Matthew 16:16-18)', answer: false },
  { id: 67, statement: 'Church is built upon Peter\'s confession that says, "Jesus is Christ." (Matthew 16:16-18)', answer: true },
  { id: 68, statement: "Church is the body of Christ and the head of the body of Christ is the senior pastor. (Colossians 1:18)", answer: false },
  { id: 69, statement: "According to the Great Commission the ultimate purpose of church is going to places where the gospel has not been preached. (Matthew 28:19-20)", answer: false },
  { id: 70, statement: "According to the Great Commission churches where the disciples are not being made can't be called church. (Matthew 28:19-20)", answer: true },
  { id: 71, statement: "The most important method Jesus used in making disciples was to teach the Old Testament. (Mark 3:14-15)", answer: false },
  { id: 72, statement: "Jesus made disciples through modeling instead of just teaching. (Mark 3:14-15)", answer: true },
  { id: 73, statement: "If you want to build a true community of believers you must share all your resources just as they did in Jerusalem church in the 1st century AD.", answer: false },
  { id: 74, statement: "The four important things that the early Christians did were learning God's word, fellowshipping with each other, breaking the bread and praying together. (Acts 2:42)", answer: true },
  { id: 75, statement: "When the early Christians praised God they only used psalms with tunes attached to them. (Ephesians 5:19)", answer: false },
  { id: 76, statement: "Until the 3rd century AD when the Christians began to worship God on Sundays, the early Christians gathered together for worship on Sabbath which is from Friday evening to Saturday evening. (Acts 20:7)", answer: false },
  { id: 77, statement: "It is scriptural to prepare and give offering individually based on his income. (Acts 20:7)", answer: true },
  { id: 78, statement: "Among the resources God has given us, there are those that we can use on ourselves and those that we must use for others. (2 Corinthians 9:6-11)", answer: true },
  { id: 79, statement: "God loves those who are reluctant givers. (2 Corinthians 9:6-11)", answer: false },
  { id: 80, statement: "Tithing is mentioned only in the Old Testament.", answer: false },
  { id: 81, statement: "Tithing has been practiced even before the Law was given to Moses.", answer: true },
  { id: 82, statement: "Since Jesus is the vine and we are the branches there is nothing we need to do to bear fruit. (John 15:5)", answer: false },
  { id: 83, statement: "In order to bear fruit in our life, we who are the branches must make an effort to stay close to Jesus who is the vine. (John 15:5)", answer: true },
  { id: 84, statement: "Trials make us more like Jesus through the process called perseverance. (James 1:2-4)", answer: true },
  { id: 85, statement: "The reason why trials come to God's children is because they have sinned before God. (Hebrews 12:5-11)", answer: false },
  { id: 86, statement: "The reason why God disciplines us is because He loves us. (Hebrews 12:5-11)", answer: true },
  { id: 87, statement: "The evil spirit has a great structure. (Ephesians 6:12)", answer: true },
  { id: 88, statement: "Often there is work of the evil spirit behind those who work against God's people. (Ephesians 6:12)", answer: true },
  { id: 89, statement: "God at times lets us be tempted beyond what we can bear. (1 Corinthians 10:13)", answer: false },
  { id: 90, statement: "God will not let us be tempted beyond what we can bear. (1 Corinthians 10:13)", answer: true },
  { id: 91, statement: "If you realize God's mercy and want to offer yourselves as sacrifice, you must become a pastor or missionary. (Romans 12:1)", answer: false },
  { id: 92, statement: "Everyone who has realized God's mercy must offer himself as a living sacrifice. (Romans 12:1)", answer: true },
  { id: 93, statement: "Offering yourself as a living sacrifice means that you discern God's will in whatever the situation and act upon it. (Romans 12:2)", answer: true },
  { id: 94, statement: "When the Bible says sacrifice, it means doing ministry in church setting for the work of the gospel. (Romans 12:2)", answer: false },
  { id: 95, statement: "The priest in the Old Testament refers to Aaron's descendants whereas in the New Testament it refers to the pastors. (1 Peter 2:9)", answer: false },
  { id: 96, statement: "In the Old Testament only the descendants of Aaron were able to become priests. But in the New Testament anyone who is saved can become a priest of God. (1 Peter 2:9)", answer: true },
  { id: 97, statement: "It is biblical for pastors to equip church members so the members could do the works of ministry. (Ephesians 4:11-12)", answer: true },
  { id: 98, statement: "The three important works of pastors is to equip the members, do the works of ministry and build up the body of Christ. (Ephesians 4:11-12)", answer: false },
  { id: 99, statement: "God's commands seem to restrict us but they truly give us freedom. (James 1:22-25)", answer: true },
  { id: 100, statement: "Even if we don't practice God's word, we will grow and change if we listen to God's word a lot. (James 1:22-25)", answer: false },
  { id: 101, statement: "The rocky soil is someone who hears God's word but does not bear fruit because of the worries of this life and the deceitfulness of wealth. (Matthew 13:3-8)", answer: false },
  { id: 102, statement: "Someone who hears God's word with one ear but lets it out through the other ear is compared to the hardened path. (Matthew 13:3-8)", answer: true },
  { id: 103, statement: "If you have God-honoring priority, God will take care of your basic necessities. (Matthew 6:33)", answer: true },
  { id: 104, statement: "A responsible Christian is someone who takes care of his needs first and then seeks God's kingdom and His righteousness. (Matthew 6:33)", answer: false },
  { id: 105, statement: "When God evaluates our work, He looks for faithfulness more than the results. (Matthew 25:14-30)", answer: true },
  { id: 106, statement: "God's compliment is proportional to the fruit of our ministry. (Matthew 25:14-30)", answer: false }
];

const VERSES = [
  { id: 1, reference: "Romans 3:10-11", text: "None is righteous, no, not one; no one understands; no one seeks for God." },
  { id: 2, reference: "Isaiah 59:2", text: "But your iniquities have made a separation between you and your God, and your sins have hidden His face from you so that He does not hear." },
  { id: 3, reference: "Isaiah 53:6", text: "All we like sheep have gone astray; we have turned – every one – to his own way; and the Lord has laid on him the iniquity of us all." },
  { id: 4, reference: "Hebrews 9:27", text: "And just as it is appointed for man to die once, and after that comes judgment." },
  { id: 5, reference: "1 Peter 2:24", text: "He Himself bore our sins in His body on the tree, that we might die to sin and live to righteousness. By His wounds you have been healed." },
  { id: 6, reference: "John 3:16", text: "For God so loved the world, that He gave His only Son, that whoever believes in Him should not perish but have eternal life." },
  { id: 7, reference: "John 1:12", text: "But to all who did receive Him, who believed in His name, He gave the right to become children of God." },
  { id: 8, reference: "Revelation 3:20", text: "Behold, I stand at the door and knock. If anyone hears My voice and opens the door, I will come in to him and eat with him, and he with Me." },
  { id: 9, reference: "1 John 5:11-12", text: "And this is the testimony, that God gave us eternal life, and this life is in His Son. Whoever has the Son has life; whoever does not have the Son of God does not have life." },
  { id: 10, reference: "John 5:24", text: "Truly, truly, I say to you, whoever hears My Word and believes Him who sent Me has eternal life. He does not come into judgment, but has passed from death to life." },
  { id: 11, reference: "Ephesians 2:8-9", text: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast." },
  { id: 12, reference: "2 Corinthians 5:17", text: "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come." }
];
