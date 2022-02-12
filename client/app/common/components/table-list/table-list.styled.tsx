import styled from 'styled-components';

export const TableListUi = styled.div`
  .t-row {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    border-top: 1px solid #efefef;

    &::last-child {
      border-bottom: 1px solid #efefef;
    }

    .t-col {
      padding: 0 2rem;
    }
    &.t-head {
      text-align: center;
      font-weight: bold;
    }
    &:not(.t-head) {
      &:hover {
        background-color: rgba(0, 0, 0, 0.02);
        transition: all 0.3s ease;
      }
    }
  }
  .infor {
    flex: 1;
    display: flex;
    &__left {
      flex: 0 0 120px;
      padding-right: 20px;
      img {
        width: 100%;
        height: 66.66667px;
        object-fit: cover;
        object-position: center;
        cursor: pointer;
      }
    }
    &__right {
      .title {
        cursor: pointer;
      }
      .meta {
        color: #999;
        font-size: 12px;
        .value {
          padding: 6px;
        }
        .line {
          margin-top: 0.6rem;
        }
      }
    }
  }
  .status,
  .control {
    flex: 0 0 160px;
    font-size: 14px;
  }
  .cat {
    flex: 0 0 200px;
    .cat-item {
      display: inline-block;
      padding: 4px 8px;
      margin-right: 1rem;
      background: #efefef;
      margin-top: 4px;
      font-size: 14px;
    }
  }
  .status {
    text-align: center;
    span {
      display: inline-block;
      padding: 2px 4px;
    }
    .public {
      color: green;
    }
  }
  .control {
    display: flex;
    justify-content: center;
    .icon {
      cursor: pointer;
      color: #ccc;
      &:hover {
        color: #333;
      }
    }
  }
`;
