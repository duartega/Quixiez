export type QueTextPhase =
  | "NOT_STARTED"
  | "FIRST_NAME"
  | "LAST_NAME"
  | "ADDRESS"
  | "CONSUMER_TYPE"
  | "DL_IMAGE"
  | "REC_IMAGE"
  /**
   * ConsumerUser is constructing their order
   *
   * Override can happen here at this point.
   */
  | "CONSTRUCT_ORDER"
  | "CONFIRM_ADDRESS"
  | "CHANGE_ADDRESS"
  /**
   * The order has been complete from the 'bots'
   * standpoint
   */
  | "COMPLETE" // SELECT
  /**
   * Company has completed the order
   */
  | "COMPANY_COMPLETE" // DONT SELECT
  /**
   * The order is in progress (being packed)
   */
  | "IN_PROGRESS" // SELECT
  /**
   * Consumer cancelled order
   */
  | "CONSUMER_CANCELLED" // DONT SELECT
  /**
   * Company rejected order
   */
  | "COMPANY_REJECTED" // DONT SELECT
  /**
   * Company has archived this message.
   *
   * @ARCHIVE is a neutral phase
   *
   * They haven't marked the order
   * as complete, rejected, cancelled,
   * or anything else... they simply
   * have not tended to this order/conversation
   * and it has become irrelevant so the order
   * will NOT be returned when they request all
   * the QueText's
   */
  | "ARCHIVED"; // DONT SELECT
