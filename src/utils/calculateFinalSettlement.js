export function calculateFinalSettlement(trip) {
  if (trip?.expenses?.length) {
    const balances = {}

    // Map participant IDs to their names
    const participantNames = {}
    trip?.tripParticipants.forEach((participant) => {
      participantNames[participant._id] = participant.name
      balances[participant._id] = 0 // Initialize each participant's balance to zero
    })

    // Process each expense
    trip?.expenses?.forEach((expense) => {
      const { amount, paidBy, sharedAmong } = expense
      const shareAmount = amount / sharedAmong.length // Dynamic share based on participants in this expense

      // Deduct the share amount from each participant who shared the expense
      sharedAmong?.forEach((participant) => {
        balances[participant._id] -= shareAmount
      })

      // Add the total amount to the person who paid
      balances[paidBy._id] += amount
    })

    // Prepare final settlement statements
    const settlements = []
    const creditors = []
    const debtors = []

    // Separate participants into creditors (positive balance) and debtors (negative balance)
    Object.entries(balances).forEach(([participantId, balance]) => {
      if (balance > 0) creditors.push({ participantId, amount: balance })
      else if (balance < 0) debtors.push({ participantId, amount: -balance }) // convert to positive for ease
    })

    // Match debtors to creditors for settlement
    while (debtors.length && creditors.length) {
      const debtor = debtors[0]
      const creditor = creditors[0]

      const settlementAmount = Math.min(debtor.amount, creditor.amount)

      // Record the settlement with names
      settlements.push({
        from: participantNames[debtor.participantId],
        to: participantNames[creditor.participantId],
        fromId: debtor.participantId,
        toId: creditor.participantId,
        amount: settlementAmount,
      })

      // Adjust balances
      debtor.amount -= settlementAmount
      creditor.amount -= settlementAmount

      // Remove settled parties from the array if their balance is zero
      if (debtor.amount === 0) debtors.shift()
      if (creditor.amount === 0) creditors.shift()
    }

    return settlements
  } else {
    return []
  }
}
