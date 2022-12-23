export default {
  'login.page.title': 'Login',
  'home.page.title': 'Dashboard',
  'members.page.title': 'Members',
  'login.form.username.label': 'Username',
  'login.form.password.label': 'Password',
  'login.form.submit.label': 'Login',
  // Header
  'header.logout-button.label': 'Logout',
  // Error messages
  'api.error.general': 'Error',
  // Members
  'members.table.headers.id': 'ID',
  'members.table.headers.agent-superior': 'Agent/Superior',
  'members.table.headers.username-real-name': 'Username/Name',
  'members.table.headers.phone': 'Phone',
  'members.table.headers.balance': 'Balance',
  'members.table.headers.available': 'Available',
  'members.table.headers.freeze': 'Freeze',
  'members.table.headers.withdrawable': 'Withdrawable',
  'members.table.headers.today-income': 'Today Income',
  'members.table.headers.is-real': 'Is Real',
  'members.table.headers.account-status': 'Is Verified?',
  'members.table.headers.can-ipo': 'Can IPO',
  'members.table.headers.is-playing-board': 'Playing Board?',
  'members.table.headers.last-login-ip': 'Last IP',
  'members.table.headers.create-by': 'Create By',
  'members.table.headers.actions': 'Actions',
  // Sub member table
  'members.table.headers.real-name': 'Real name',
  'members.table.headers.id-no': 'ID No.',
  'members.table.headers.id-front': 'Front',
  'members.table.headers.id-back': 'Back',
  'members.table.headers.bank-name': 'Bank',
  'members.table.headers.account-no': 'Account No.',
  'members.table.headers.holder': 'Holder',
  'members.table.headers.approver': 'Approver',
  'members.table.headers.reviewed-at': 'Reviewed At',
  'members.buttons.create.label': 'Create',
  'members.buttons.edit.label': 'Edit',
  'members.buttons.delete.label': 'Delete',
  'create-user.form.username.label': 'Username',
  'create-user.form.password.label': 'Password',
  'create-user.form.confirm-password.label': 'Confirm Password',
  'create-user.form.submit.label': 'Create',
  'create-user.dialog.title': 'Create User',
  'create-user.dialog.success': 'User {username} has been created',
  'members.table.button.delete.confirm': 'Are you sure to delete this user?',
  'members.table.button.delete.success': 'User has been deleted?',
  'confirmation.yes-label': 'Yes',
  'confirmation.no-label': 'No',
  'update-user.dialog.success': 'User {username} has been updated',
  'update-user.dialog.title': 'Update user {username}',
  'update-user.form.phone.label': 'Phone',
  'update-user.form.realname.label': 'Real Name',
  'update-user.form.bank-number.label': 'Account Number',
  'update-user.form.submit.label': 'Update',
  // Validation messages
  'validation-messages': {
    required: {
      username: 'Please provide username',
      password: 'Please provide password',
      realname: 'Please provide user real name',
      bankNumber: 'Please provide bank account number',
      phone: 'Please provide phone number',
      amount: 'Please provide amount to modify',
      selectedUserId: 'Please select user to create deposit',
      bank_name: 'Please enter the bank name',
      branch: 'Please enter the bank branch',
      account_number: 'Please enter the account number',
      account_holder: 'Please enter the account holder'
    },
    numeric: {
      phone: 'Invalid phone number'
    },
    alphaNum: {
      username: 'Invalid username. Please only use alphabet and numeric characters',
      bankNumber: 'Invalid bank account number'
    },
    sameAs: {
      confirmPassword: 'Password does not match'
    }
  },

  'members.buttons.reset-password.label': 'Reset password',
  'members.buttons.reset-withdraw-password.label': 'Reset withdraw password',
  'members.buttons.modify-balance.label': 'Modify balance',
  'members.buttons.lock-account.label': 'Lock',
  'members.lock-user.confirm-message': 'Are you sure to lock this user?',
  'members.lock-user.success': 'User has been locked',
  'members.buttons.unlock-account.label': 'Unlock',
  'members.unlock-user.confirm-message': 'Are you sure to unlock this user?',
  'members.unlock-user.success': 'User has been unlocked',
  'modify-user-balance.dialog.title': 'Modify balance',
  'modify-user-balance.submit.label': 'Submit',
  'modify-user-balance.amount.label': 'Amount',
  'modify-user-balance.success': 'User balance has been modified',
  'modify-user-balance.failed': 'Failed to modify user balance',
  'modify-user-balance.type.label': 'Type',
  'modify-user-balance.type.increase': 'Increase',
  'modify-user-balance.type.decrease': 'Decrease',
  'modify-user-balance.comments.label': 'Comments',
  'modify-user-balance.comments.note': 'Only admins/operators can see this',
  'modify-user-balance.remark.label': 'Remark',
  'modify-user-balance.remark.note': 'Everyone can see this',

  // Deposit page
  'deposit.page.title': 'Deposit Manager',
  'deposit.buttons.create.label': 'Create',
  'deposit.table.headers.id': 'ID',
  'deposit.table.headers.username-realname': 'Username/Name',
  'deposit.table.headers.agent-superior': 'Agent/Superior',
  'deposit.table.headers.amount': 'Amount',
  'deposit.table.headers.reviewer': 'Reviewed By/Time',
  'deposit.table.headers.created-at': 'Created At',
  'deposit.table.headers.remark': 'Remark',
  'deposit.table.headers.notes': 'Notes',
  'deposit.table.headers.status': 'Status',
  'deposit.status.approved': 'Approved',
  'deposit.status.pending': 'Pending',
  'deposit.status.rejected': 'Rejected',
  'deposit.table.headers.actions': 'Actions',
  'deposit.table.actions.review': 'Review',
  'review-deposit.dialog.title': 'Review deposit',
  'review-deposit.form.username.label': 'Username',
  'review-deposit.form.realname.label': 'Real name',
  'review-deposit.form.amount.label': 'Amount',
  'review-deposit.form.bank-name.label': 'Bank name',
  'review-deposit.form.account-holder.label': 'Account holder',
  'review-deposit.form.account-number.label': 'Account number',
  'review-deposit.form.bank-branch.label': 'Branch',
  'review-deposit.form.status.label': 'Status',
  'review-deposit.form.admin-notes.label': 'Admin notes',
  'review-deposit.form.remark.label': 'remark',
  'review-deposit.form.submit.label': 'Submit',
  'review-deposit.success': 'Deposit has been reviewed',
  'review-deposit.failed': 'Failed to review deposit',

  // Create deposit
  'create-deposit.dialog.title': 'Create deposit',
  'create-deposit.user.label': 'Username/Real name',
  'create-deposit.user.placeholder': 'Enter username or real name to select',
  'create-deposit.amount.label': 'Amount',
  'create-deposit.submit.label': 'Submit',
  'create-deposit.success': 'Deposit has been created',
  'create-deposit.failed': 'Failed to create deposit',

  // Withdrawals
  'withdrawals.page.title': 'Withdrawals',
  'withdrawals.buttons.create.label': 'Create',
  'withdrawals.table.headers.id': 'ID',
  'withdrawals.table.headers.username-realname': 'Username/Name',
  'withdrawals.table.headers.agent-superior': 'Agent/Superior',
  'withdrawals.table.headers.amount': 'Amount',
  'withdrawals.table.headers.bank': 'Bank',
  'withdrawals.table.headers.account-number': 'Account Number',
  'withdrawals.table.headers.account-holder': 'Account Holder',
  'withdrawals.table.headers.reviewer': 'Reviewed By/Time',
  'withdrawals.table.headers.created-at': 'Created At',
  'withdrawals.table.headers.remark': 'remark',
  'withdrawals.table.headers.notes': 'Notes',
  'withdrawals.table.headers.status': 'Status',
  'withdrawals.status.approved': 'Approved',
  'withdrawals.status.pending': 'Pending',
  'withdrawals.status.rejected': 'Rejected',
  'withdrawals.table.headers.actions': 'Actions',
  'withdrawals.table.actions.review': 'Review',
  'review-withdrawal.dialog.title': 'Review withdrawal',
  'review-withdrawal.form.username': 'Username',
  'review-withdrawal.form.real-name': 'Real name',
  'review-withdrawal.form.amount': 'Amount',
  'review-withdrawal.form.status': 'Status',
  'review-withdrawal.form.remark': 'remark',
  'review-withdrawal.form.comments': 'Comments',
  'review-withdrawal.form.submit.label': 'Submit',
  'review-withdrawal.success': 'Withdrawal has been reviewed',
  'review-withdrawal.failed': 'Failed to review withdrawal',

  // Deposit Account
  'deposit-accounts.page.title': 'Deposit Accounts',
  'deposit-accounts.buttons.create.label': 'Create',
  'deposit-accounts.table.headers.id': 'ID',
  'deposit-accounts.table.headers.bank': 'Bank',
  'deposit-accounts.table.headers.account-number': 'Account Number',
  'deposit-accounts.table.headers.account-holder': 'Account Holder',
  'deposit-accounts.table.headers.branch': 'Branch',
  'deposit-accounts.table.headers.created-at': 'Created At',
  'deposit-accounts.table.headers.is_enabled': 'Is Enabled?',
  'deposit-accounts.table.headers.is_public': 'Is Public?',
  'deposit-accounts.table.headers.actions': 'Actions',
  'deposit-accounts.table.headers.actions.edit': 'Edit',
  'deposit-accounts.table.headers.actions.delete': 'Delete',

  // Create Deposit Account
  'create-deposit-accounts.dialog.title': 'Create Deposit Account',
  'create-deposit-accounts.submit.label': 'Submit',
  'create-deposit-accounts.success': 'Deposit account has been created',
  'create-deposit-accounts.failed': 'Failed to create deposit account',
  'deposit-accounts.table.headers.actions.delete.confirm': 'Are you sure to delete this deposit account?',
  'deposit-accounts.table.headers.actions.delete.success': 'Deposit account has been deleted',
  'deposit-accounts.table.headers.actions.delete.failed': 'Failed to delete deposit account',

  // Update deposit account
  'update-deposit-accounts.success': 'Deposit account has been updated',
  'update-deposit-accounts.failed': 'Failed to update deposit account',
  'update-deposit-accounts.dialog.title': 'Update deposit account',

  // Transactions
  'transactions.table.headers.id': 'ID',
  'transactions.table.headers.username-realname': 'Username/Real name',
  'transactions.table.headers.agent': 'Agent/Superior',
  'transactions.table.headers.type': 'Type',
  'transactions.type.withdrawal': 'Withdrawal',
  'transactions.type.deposit': 'Deposit',
  'transactions.type.sell': 'Sell stock',
  'transactions.type.buy': 'Buy stock',
  'transactions.table.headers.amount': 'Amount',
  'transactions.table.headers.before': 'Before change',
  'transactions.table.headers.after': 'After change',
  'transactions.table.headers.created-at': 'Created at',
  'transactions.table.headers.comments': 'Comments',
  'transactions.table.headers.remark': 'remark'
}
