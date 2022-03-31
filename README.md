# **Tic-Tac-Toe Game**

## **Tic-Tac-Toe AI Agent**

___

### **PEAS**

- P (*Performance*) => ***speed, the agent always makes a valid move, the agent can win or at least draw***

- E (*Environment*) => ***3x3 board***

- A (*Actuators*) => ***The opponent***

- S (*Sensors*) => ***The opponent’s movement***

___

### **ODESA**

- O (*Observability*) => ***Fully observable***

- D (*Deterministic*) => ***Deterministic***

- E (*Episode*) => ***Sequential***

- S (*Static*) => ***Static***

- A (*Agent*) => ***Multi-agent (Competitive)***

- ***Discrete Environment***

___

### Agent type

#### ***simple-reflex agent***

#### Reason

1. Because the environment is fully observable.
2. The agent has full knowledage of all the possible moves in the game.
3. The agent doesn't need to remember past states of the game, it only deals with the current state.

___

### Problem Formulation

- Initial State => Empty board

- Successor function => Any remaining empty cell

- Goal Test => Win the game or atleast draw

- Path Cost => Every move has a cost, "X" Will try to maximize the cost, and "O" will try to minimize it. (minimax Algorithm)
___

### Game Tree

![](./img/Game%20Tree.jpg)