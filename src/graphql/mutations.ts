/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAdminSettings = /* GraphQL */ `
  mutation CreateAdminSettings(
    $input: CreateAdminSettingsInput!
    $condition: ModelAdminSettingsConditionInput
  ) {
    createAdminSettings(input: $input, condition: $condition) {
      id
      hacklyticsOpen
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateAdminSettings = /* GraphQL */ `
  mutation UpdateAdminSettings(
    $input: UpdateAdminSettingsInput!
    $condition: ModelAdminSettingsConditionInput
  ) {
    updateAdminSettings(input: $input, condition: $condition) {
      id
      hacklyticsOpen
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteAdminSettings = /* GraphQL */ `
  mutation DeleteAdminSettings(
    $input: DeleteAdminSettingsInput!
    $condition: ModelAdminSettingsConditionInput
  ) {
    deleteAdminSettings(input: $input, condition: $condition) {
      id
      hacklyticsOpen
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      name
      description
      status
      start
      end
      location
      checkins {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      name
      description
      status
      start
      end
      location
      checkins {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      name
      description
      status
      start
      end
      location
      checkins {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createCheckin = /* GraphQL */ `
  mutation CreateCheckin(
    $input: CreateCheckinInput!
    $condition: ModelCheckinConditionInput
  ) {
    createCheckin(input: $input, condition: $condition) {
      id
      createdBy
      createdByName
      user
      userName
      event {
        id
        name
        description
        status
        start
        end
        location
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      eventCheckinsId
    }
  }
`;
export const updateCheckin = /* GraphQL */ `
  mutation UpdateCheckin(
    $input: UpdateCheckinInput!
    $condition: ModelCheckinConditionInput
  ) {
    updateCheckin(input: $input, condition: $condition) {
      id
      createdBy
      createdByName
      user
      userName
      event {
        id
        name
        description
        status
        start
        end
        location
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      eventCheckinsId
    }
  }
`;
export const deleteCheckin = /* GraphQL */ `
  mutation DeleteCheckin(
    $input: DeleteCheckinInput!
    $condition: ModelCheckinConditionInput
  ) {
    deleteCheckin(input: $input, condition: $condition) {
      id
      createdBy
      createdByName
      user
      userName
      event {
        id
        name
        description
        status
        start
        end
        location
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      eventCheckinsId
    }
  }
`;
export const createPoints = /* GraphQL */ `
  mutation CreatePoints(
    $input: CreatePointsInput!
    $condition: ModelPointsConditionInput
  ) {
    createPoints(input: $input, condition: $condition) {
      userID
      points
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updatePoints = /* GraphQL */ `
  mutation UpdatePoints(
    $input: UpdatePointsInput!
    $condition: ModelPointsConditionInput
  ) {
    updatePoints(input: $input, condition: $condition) {
      userID
      points
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deletePoints = /* GraphQL */ `
  mutation DeletePoints(
    $input: DeletePointsInput!
    $condition: ModelPointsConditionInput
  ) {
    deletePoints(input: $input, condition: $condition) {
      userID
      points
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
