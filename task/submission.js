const { namespaceWrapper } = require('../_koiiNode/koiiNode');
const crypto = require('crypto');
class Submission {
    async task(round) {
        try {
            // Hardcoded data for submission
            const submissions = [
                { id: 1, data: 'Data 1', isValid: true },
                { id: 2, data: 'Data 2', isValid: true },
                // ... more submissions
            ];

            let hash = crypto.createHash('sha256').update(submissions.toString()).digest('hex')
            console.log('hash', hash)
            console.log('ROUND', round);

            // Store each submission

                await namespaceWrapper.storeSet('value', hash);


            return hash;
        } catch (err) {
            console.log('ERROR IN EXECUTING TASK', err);
            return 'ERROR IN EXECUTING TASK' + err;
        }
    }

  async submitTask(roundNumber) {
    console.log('submitTask called with round', roundNumber);
    try {
      console.log('inside try');
      console.log(
        await namespaceWrapper.getSlot(),
        'current slot while calling submit',
      );
      const submission = await this.fetchSubmission(roundNumber);
      console.log('SUBMISSION', submission);
      await namespaceWrapper.checkSubmissionAndUpdateRound(
        submission,
        roundNumber,
      );
      console.log('after the submission call');
      return submission;
    } catch (error) {
      console.log('error in submission', error);
    }
  }

  async fetchSubmission(round) {
    // Write the logic to fetch the submission values here and return the cid string

    // fetching round number to store work accordingly

    console.log('IN FETCH SUBMISSION');

    // The code below shows how you can fetch your stored value from level DB

    const value = await namespaceWrapper.storeGet('value'); // retrieves the value
    console.log('VALUE', value);
    return value;
  }
}
const submission = new Submission();
module.exports = { submission };
