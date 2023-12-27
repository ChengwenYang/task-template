const { namespaceWrapper } = require('../_koiiNode/koiiNode');

class Audit {
    async validateNode(submission_value, round) {
        let vote;
        console.log('SUBMISSION VALUE', submission_value, round);
        try {
            // Regular expression to validate a hexadecimal string
            const hexRegex = /^[0-9a-fA-F]{64}$/; // 64 characters for SHA-256 hash

            if (hexRegex.test(submission_value)) {
                // If the submission value is a valid hexadecimal string
                vote = true;
            } else {
                // If the submission value is not a valid hexadecimal string
                vote = false;
            }
        } catch (e) {
            console.error(e);
            vote = false;
        }
        return vote;
    }

  async auditTask(roundNumber) {
    console.log('auditTask called with round', roundNumber);
    console.log(
      await namespaceWrapper.getSlot(),
      'current slot while calling auditTask',
    );
    await namespaceWrapper.validateAndVoteOnNodes(
      this.validateNode,
      roundNumber,
    );
  }
}
const audit = new Audit();
module.exports = { audit };
