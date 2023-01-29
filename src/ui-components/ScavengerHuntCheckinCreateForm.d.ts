/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ScavengerHuntCheckinCreateFormInputValues = {
    checkpointID?: string;
    userID?: string;
};
export declare type ScavengerHuntCheckinCreateFormValidationValues = {
    checkpointID?: ValidationFunction<string>;
    userID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ScavengerHuntCheckinCreateFormOverridesProps = {
    ScavengerHuntCheckinCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    checkpointID?: PrimitiveOverrideProps<TextFieldProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ScavengerHuntCheckinCreateFormProps = React.PropsWithChildren<{
    overrides?: ScavengerHuntCheckinCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ScavengerHuntCheckinCreateFormInputValues) => ScavengerHuntCheckinCreateFormInputValues;
    onSuccess?: (fields: ScavengerHuntCheckinCreateFormInputValues) => void;
    onError?: (fields: ScavengerHuntCheckinCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ScavengerHuntCheckinCreateFormInputValues) => ScavengerHuntCheckinCreateFormInputValues;
    onValidate?: ScavengerHuntCheckinCreateFormValidationValues;
} & React.CSSProperties>;
export default function ScavengerHuntCheckinCreateForm(props: ScavengerHuntCheckinCreateFormProps): React.ReactElement;
