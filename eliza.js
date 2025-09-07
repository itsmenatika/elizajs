var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createInterface } from "readline/promises";
/** the list of answers */
const pairs = [
    {
        search: [
            /i am scared about (.*)/g,
            /i am scared of (.*)/g,
            /i am terrified of (.*)/g,
            /i am constantly thinking about (.*)/g,
            /i am constantly thinking of (.*)/g,
            /i can not stop thinking about (.*)/g,
            /i cant no stop thinking of (.*)/g
        ],
        responses: [
            "why are you scared?",
            "is there really a reason to be scared?",
            "maybe you should explore it more",
            "why are you scared of %0?",
            "would you say that i would be scared of %0?",
            "what would your friends do?",
            "why does it make you scared?",
            "explain it more deeply",
            "you don't have to be scared here. you're safe",
            "have you tried sleeping on %0?",
            "have you tried talking about %0 to others?",
            "have you ever tried to reconsider %0?",
            "when have you started being afraid of %0?",
        ]
    },
    {
        search: [
            /i was thinking about (.*)/g,
            /i think about (.*)/g,
            /i have a thought about (.*)/g,
            /i have a thought that (.*)/g,
            /i am having a thought that (.*)/g,
            /i am having a thought about (.*)/g
        ],
        responses: [
            "and why do you think that?",
            "and what is the reason that you think that?",
            "would you want to explain more about why you think that?",
            "is there any particular reason for that?",
            `would you like to explain why "%0"?`,
            `why?`,
            `why %0?`,
            `and how does it make you feel?`,
            "is there any particular reason that you think about %0?",
            "would you please to elaborate?",
            "how does it make you feel?",
            "explain",
            "i understand you, but why?",
        ]
    },
    {
        search: [
            /^why is it that (.*)/g,
            /^why (.*)/g,
            /^what is the reason that (.*)/g,
            /^what is the reason (.*)/g,
        ],
        responses: [
            "why don't you tell me the reason why %0?",
            "why do you think %0?"
        ]
    },
    {
        search: [
            /^i need (.*)/g,
        ],
        responses: [
            "Why do you need %0?",
            "Would it really help you to get %0?",
            "Are you sure you need %0?"
        ]
    },
    {
        search: [
            /^why do not you (.*)/g,
        ],
        responses: [
            "Do you really think I don't %0?",
            "Perhaps eventually I will %0.",
            "Do you really want me to %0?"
        ]
    },
    {
        search: [
            /^you are (.*)/g,
            /^i think you are (.*)/g,
            /^perhaps you are (.*)/g
        ],
        responses: [
            "why do you say I am %0?",
            "why do you think I am %0?",
            "are we talking about you, or me?"
        ]
    },
    {
        search: [
            /^are you (.*)/g,
        ],
        responses: [
            "Why do you ask?",
            "How would an answer to that help you?",
            "What do you think?"
        ]
    },
    {
        search: [
            /^i can not (.*)/g,
            /^why can not i (.*)/g
        ],
        responses: [
            "how does being %1 make you feel?",
            "do you enjoy being %0?",
            "why do you tell me you're %0?",
            "why do you think you're %0?",
            "Do you think you should be able to %0?",
            "If you could %1, what would you do?",
            "I don't know -- why can't you %0?",
            "Have you really tried?"
        ]
    },
    {
        search: [
            /^i can not (.*)/g,
            /^why can not i (.*)/g
        ],
        responses: [
            "how does being %1 make you feel?",
            "do you enjoy being %0?",
            "why do you tell me you're %0?",
            "why do you think you're %0?",
            "Do you think you should be able to %0?",
            "If you could %1, what would you do?",
            "I don't know -- why can't you %0?",
            "Have you really tried?"
        ]
    },
    {
        search: [
            /^i am (.*)/g,
        ],
        responses: [
            "how does being %1 make you feel?",
            "do you enjoy being %0?",
            "why do you tell me you're %0?",
            "why do you think you're %0?",
            "Did you come to me because you are %0?",
            "How long have you been %0?",
            "How do you feel about being %0?"
        ]
    },
    {
        search: [
            /^what (.*)/g,
        ],
        responses: [
            "Why does it matter whether I am %0?",
            "Would you prefer it if I were not %0?",
            "Perhaps you believe I am %0",
            "I may be %1 -- what do you think?"
        ]
    },
    {
        search: [
            /how (.*)/g,
        ],
        responses: [
            "How do you suppose?",
            "Perhaps you can answer your own question.",
            "What is it you're really asking?"
        ]
    },
    {
        search: [
            /(.*) sorry (.*)/g,
            /(.*) sry (.*)/g,
        ],
        responses: [
            "There are many times when no apology is needed.",
            "What feelings do you have when you apologize?",
            "remember that your feelings are valid",
            "you don't need to apologize",
            "why do you feel a need to apologize?"
        ]
    },
    {
        search: [
            /^is it (.*)/g,
        ],
        responses: [
            "Do you think it is %0?",
            "Perhaps it's %0 -- what do you think?",
            "If it were %0, what would you do?",
            "It could well be that %0."
        ]
    },
    {
        search: [
            /^it is (.*)/g,
        ],
        responses: [
            "You seem very certain.",
            "If I told you that it probably isn't %0, what would you feel?",
            "is it really %0?"
        ]
    },
    {
        search: [
            /^can you (.*)/g,
        ],
        responses: [
            "what makes you think i can't %0?",
            "if i could %0, then what?",
            "why do you ask if i can %0?"
        ]
    },
    {
        search: [
            /^can i (.*)/g,
        ],
        responses: [
            "perhaps you don't want to %0",
            "do you want to be able to %0?",
            "if you could %0, would you?"
        ]
    },
    {
        search: [
            /^i do not really (.*)/g,
            /^i do not (.*)/g,
        ],
        responses: [
            "don't you really %0?",
            "why don't you %0?",
            "do you want to %0?",
            "are you sure that you don't want %0?",
            "are you hiding your desires?"
        ]
    },
    {
        search: [
            /^i feel (.*)/g,
            /^my feelings are (.*)/g,
            /^i think i feel(.*)/g
        ],
        responses: [
            "good, tell me more about these feelings",
            "why do you feel %0?",
            "do you often feel %0?",
            "are you feelings often like that?",
            "when do you usually feel like that?"
        ]
    },
    {
        search: [
            /i have (.*)/g,
            /i think i have (.*)/g
        ],
        responses: [
            "why do you think you have %0?",
            "why do you tell me that you've %0?",
            'have you really %1?',
            "now that you have %1, what will you do next?"
        ]
    },
    {
        search: [
            /^i would like to do (.*)/g,
            /^i would (.*)/g,
        ],
        responses: [
            "why would you %0?",
            "could you explain why you would %0?",
            "why would you %0?",
            "who else knows that you would %0?"
        ]
    },
    {
        search: [
            /^is there (.*)/g,
            /^is here (.*)/g,
        ],
        responses: [
            "Do you think there is %0?",
            "It's likely that there is %0.",
            "Would you like there to be %0?"
        ]
    },
    {
        search: [
            /(.*)my (.*)/g
        ],
        responses: [
            "I see, your %1",
            "Why do you say that your %1?",
            "When your %1, how did you feel?"
        ]
    },
    {
        search: [
            /(.*)you(.*)/g,
            /(.*)your/g
        ],
        responses: [
            "we discussing you, not me",
            "there's no real reason to discuss me",
            "we should talk about you instead",
            "let's talk about you instead",
            "that conversation should be only about you"
        ]
    },
    {
        search: [
            /^i want (.*)/g,
            /^my desire is (.*)/g,
            /^i desire (.*)/g,
            /^i would like (.*)/g,
            /^it would be wonderful if (.*)/g
        ],
        responses: [
            "why do you want %0?",
            "why do you desire %0?",
            "why is that your desire?",
            "don't you have that?",
            "i see. Why do you want it?",
            "why do you want it?",
            "is there any reason why you want %0?",
            "if you got %0, then what would you do?",
            "what would you do if you got %0?",
        ]
    },
    {
        search: [
            /^it is because of (.*)/g,
            /^cause (.*)/g,
            /^because (.*)/g,
            /^it is because (.*)/g,
            /^the reason is (.*)/g,
        ],
        responses: [
            "why is that?",
            "tell me the more deeper reason",
            "is that really the reason?",
            "tell me more about it",
            "if you're saying so",
            "is that it?",
            "is %0 really the reason?",
            "does %0 matter to you?",
            "i see how %0 could disturb you"
        ]
    },
    {
        search: [
            /(.*)mother(.*)/g,
            /(.*)mom(.*)/g,
            /(.*)mommy(.*)/g,
        ],
        responses: [
            "Mothers can be quite interesting, aren't they?",
            "tell me more about your mother",
            "is there something that you would like to say to her?",
            "and how does mother make you feel?",
            "what was your relationship with your mother like?",
            "does your relationship with your mother relate to your feelings today?",
            "how do you feel about your mother?"
        ]
    },
    {
        search: [
            /(.*)father(.*)/g,
            /(.*)dad(.*)/g,
            /(.*)daddy(.*)/g,
        ],
        responses: [
            "would you like to talk more about your father?",
            "why does father seems so important to you?",
            "i would really want to hear more about him",
            "i want to hear more about him",
            "i would like to hear more about him",
            "what was your relationship with your dad like?",
            "does your relationship with your father relate to your feelings today?",
            "how do you feel about your father?"
        ]
    },
    {
        search: [
            /(.*)child(.*)/g,
            /(.*)kid(.*)/g
        ],
        responses: [
            "what was your childhood like?",
            "did you have close friends as a child?",
            "do you remember your dreams from your childhood?",
            "did you have any dreams or nightmares as a child?",
            "did the other children sometimes tease you?",
            "how do you think your childhood experiences relate to your feelings today?",
            "what is your favorite childhood memory?",
            "how do you feel about your childhood?"
        ]
    },
    {
        search: [
            /i am (.*)/g,
            /i think i am(.*)/g
        ],
        responses: [
            "why do you think you are %0?",
            "is there some reason that you think that?",
            "elaborate",
            "are you really %0?",
            "are you %0?",
            "are you though?",
            "are you certain that you are %0?",
            "if you're saying that",
            "if that's the case",
            "if you're saying so",
            "i trust you",
            "i know you"
        ]
    },
    {
        search: [
            /(.*)computer(.*)/g,
            /(.*)ai(.*)/g,
            /(.*)artificial intelligence(.*)/g,
            /(.*)clanker(.*)/g,
            /(.*)machine(.*)/g,
        ],
        responses: [
            "are you talking about me?",
            "what are you talking about?",
            "there's no way",
            "i don't know about this",
            "i don't see it",
            "there's no possible way to explain it",
            "no. i dont think so"
        ]
    },
    {
        search: [
            /^hello(.*)/g,
            /^hi(.*)/g,
            /^welcome(.*)/g,
            /^good day(.*)/g,
        ],
        responses: [
            "hello!",
            "hello! how are you?",
            "hi. how are you doing?",
            "hi. what are you doing?",
            "hi. is there something that you would to talk about?",
            "hi. do you want to talk about something?"
        ]
    },
    {
        search: [
            /(.*)yes(.*)/g,
            /(.*)sure(.*)/g,
            /(.*)of course(.*)/g,
            /(.*)certain(.*)/g
        ],
        responses: [
            "you seem very sure about this",
            "you seem to know it very well",
            "why is that?",
            "how does it make you feel?",
            "i see you're certain",
            "why are you so certain?",
            "would you like to explain your thinking",
            "it's not unusual being that certain, but why?",
            "why?",
            "tell me more"
        ]
    },
    {
        search: [
            /(.*)no(.*)/g,
            /(.*)not(.*)/g,
            /(.*)no way(.*)/g,
            /(.*)impossible(.*)/g,
            /i doubt it(.*)/g,
        ],
        responses: [
            "why are you so negative?",
            "why those negatives?",
            "why is that?",
            "are you sure?",
            "is there something that i don't see?",
            "please elaborate.",
            "please tell, why no?",
            "please tell, why are you so negative on that?",
            "is there a reason why you're saying no?"
        ]
    },
    {
        search: [
            /(.*)!/g
        ],
        responses: [
            "do you exhibit any strong emotions lately?",
            "is there any reason why you yell",
            "where did that yelling come from?",
            `why "!"?`,
            "there's always a way to calm down",
            "why are you angry?",
            "what does make you angry",
            "explain why are you angry",
            "do you always behave like that?"
        ]
    },
    {
        search: [
            /(.*)\?/g,
        ],
        responses: [
            "why do you ask that?",
            "why are you asking those questions?",
            "is there any particular reason for your asking?",
            "where did that come from?",
            "please elaborate",
            "why don't you tell me?",
            "perhaps the answer lies inside of yourself?",
            "perhaps you have the answer?"
        ]
    },
    {
        search: [
            /(.*)/g
        ],
        responses: [
            "tell me more",
            "continue",
            "i'm listening...",
            "is so?",
            "%0",
            "%0?",
            "%0??",
            "%0???",
            "very interesting",
            "you seem very concerned about that, isn't that true?",
            "i see",
            "and?",
            "so?",
            "why did you say that?",
            "why did you say %0?",
            "i see. and what does it teel you?",
            `i see. and what "%0" does tell you?`,
            "how does it make you feel?",
            "so, please tell me. How do you really feel?",
            "so, please tell me. What do you truly desire?",
            "what are your desires?",
            "is there something important that you would like to talk about?",
            "is there something that you would like to talk?",
            "do you have any particular subject to talk?",
            "can you elaborate on that?",
            "can you explain it more deeply?",
            `can you explain what "%0" means?`,
            "Lets change focus a bit.... Let's talk about your family.",
            "Lets change focus a bit.... Let's talk about animals. do you have any?",
            "Lets change focus a bit.... Let's talk about your latest achievements. what do you think?",
            "let's talk about your family",
            "let's talk about something else",
            "why would you say that?",
            "let's talk about femboys",
            "do you have any other subject?"
        ]
    }
];
/** repeating answers for eliza */
const repeating = [
    "there's no reason to repeat yourself",
    "don't repeat yourself...",
    "say something different this time",
    "yes, go on",
    "you can say that"
];
// the last user response
let lastMessage = "";
/**
 * sends a message to eliza
 * @param message user response
 * @returns eliza response
 */
function eliza(message) {
    message = message.toLowerCase(); // remove uppercase
    message = message.replace("i'm", "i am").replace("you're", "you are").replace("he's", "he is").replace("they're", "they are"); // change abbrevations to full forms
    // repeating itself
    if (message === lastMessage) {
        let resInd = Math.floor(Math.random() * repeating.length);
        return repeating[resInd];
    }
    // save the last message
    lastMessage = message;
    // for every response pair
    for (const pair of pairs) {
        let responseGroups = []; // an array storing the groups
        let found = false; // if the response was found
        // search for every possible acceptable user esponse
        for (const searchRegExp of pair.search) {
            searchRegExp.lastIndex = 0; // safety reasons
            // get all matches and unpack them (i don't want stupid iterator)
            let matches = [...message.matchAll(searchRegExp)];
            // if there was no mathces, then it wasn't found there
            if (matches.length === 0) {
                continue;
            }
            // for every match
            for (const match of matches) {
                // add to response group. skipping the first one
                for (let i = 1; i < match.length; i++) {
                    responseGroups.push(match[i]);
                }
                break;
            }
            // mark it as found
            found = true;
        }
        // if no found, then skip it
        if (!found)
            continue;
        // get round response index
        let resInd = Math.floor(Math.random() * pair.responses.length);
        // get that response
        let retString = pair.responses[resInd];
        // replace all groups (%n) -> n+1 capture group
        while (true) {
            let ind = retString.search("%"); // find group to replace
            if (ind === -1)
                break; // if there was no groups, then it's done
            let num = Number(retString[ind + 1]); // get a number of that group
            // replace it
            retString = retString.slice(0, ind) + responseGroups[num] + retString.slice(ind + 2);
        }
        // return the result
        return retString;
    }
}
// console.log(eliza("i love my mother!"));
/**
 * creates an interactive chat
 */
function createChat() {
    return __awaiter(this, void 0, void 0, function* () {
        // creates an interace
        const intr = yield createInterface({
            input: process.stdin,
            output: process.stdout
        });
        // till user wants to use it
        while (true) {
            let userResponse = yield intr.question(">> ");
            // quitting
            if (userResponse === "quit" || userResponse === "q" || "!q")
                break;
            // get eliza
            let elizaResponse = eliza(userResponse) + "\n";
            // write eliza
            intr.write(elizaResponse);
        }
        intr.close();
    });
}
// auto run if that's not used as an import
if (import.meta.url.endsWith(process.argv[1])) {
    createChat();
}
const version = 0.8;
export { createChat, eliza, version };
