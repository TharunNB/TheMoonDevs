# Task-Fragmentation
AN assignment to test the fragmentation ability of Developers

My Pick - Fragmentation of Functinality / UI

## My Reasons for Fragmentating it like that

### HOOKS:
 split into 3 hooks .

 hooks.ts : containing all the main functions and responsible for handling all the data previously handled ny the burnpage now termed refactored as useBurnPage.

 executeBurnHook.ts : The file contains all the logic that was written for the executeBurn async function.

 refetchTransactionsHook.ts: This file contains the logic for the refetchTransactions function.


 This was done so that all seemingly independent blocks of code are seperated into thier own modules and can be used in any other part of the code.

 ### COMPONENTS: 

 Done with lack of time , might be Error ridden.

 split into 3 components : 1 Main Component - (burnpage.tsx) , 2 sub Components - (BurnStats, BurnButton)

 This was done in a rush and only these components seemed inside the custom components but were incoporated into the components themselves .

 ### MODELS: 

 Tried making models to make it more readable but ditched the idea due to lack of time.