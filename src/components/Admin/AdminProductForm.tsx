// components/Admin/ProductForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { CreateAdminProduct } from "@/types/db";

interface AdminProductFormProps {
  formState: CreateAdminProduct;
  onFormChange: (newState: CreateAdminProduct) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  onDelete: () => void;
  isSubmitting: boolean;
  isDeleting: boolean;
  selectedProductId: string | null;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({
  formState,
  onFormChange,
  onSubmit,
  onReset,
  onDelete,
  isSubmitting,
  isDeleting,
  selectedProductId,
}) => {
  // helper to split/join comma lists
  const listToString = (arr?: string[]) => arr?.join(", ") ?? "";
  const stringToList = (str: string) =>
    str
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");

  // Local states for textareas that handle arrays
  const [sampleTypeText, setSampleTypeText] = useState(
    listToString(formState.sample_type)
  );
  const [regulatoryApprovalsText, setRegulatoryApprovalsText] = useState(
    listToString(formState.regulatory_approvals)
  );
  const [warningsAndPrecautionsText, setWarningsAndPrecautionsText] = useState(
    listToString(formState.warnings_and_precautions)
  );

  // Synchronize local states with formState when formState changes
  useEffect(() => {
    setSampleTypeText(listToString(formState.sample_type));
  }, [formState.sample_type]);

  useEffect(() => {
    setRegulatoryApprovalsText(listToString(formState.regulatory_approvals));
  }, [formState.regulatory_approvals]);

  useEffect(() => {
    setWarningsAndPrecautionsText(
      listToString(formState.warnings_and_precautions)
    );
  }, [formState.warnings_and_precautions]);

  return (
    <div className="bg-white shadow-xl rounded-lg p-6">
      <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-3">
        {selectedProductId ? "Edit Product" : "Create New Product"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Basic info */}
        <Input
          id="productName"
          label="Product Name"
          value={formState.name}
          onChange={(e) => onFormChange({ ...formState, name: e.target.value })}
          required
        />

        <Textarea
          id="productDescription"
          label="Description"
          rows={3}
          value={formState.description ?? ""}
          onChange={(e) =>
            onFormChange({ ...formState, description: e.target.value })
          }
        />

        {/* Pricing & stock */}
        <Input
          id="basePrice"
          label="Base Price"
          type="number"
          step="0.01"
          required
          value={formState.base_price.toString()}
          onChange={(e) =>
            onFormChange({
              ...formState,
              base_price: parseFloat(e.target.value) || 0,
            })
          }
        />

        <Input
          id="sku"
          label="SKU"
          required
          value={formState.sku ?? ""}
          onChange={(e) => onFormChange({ ...formState, sku: e.target.value })}
        />

        <Input
          id="category"
          label="Category"
          value={formState.category ?? ""}
          onChange={(e) =>
            onFormChange({ ...formState, category: e.target.value })
          }
        />

        <Input
          id="weight"
          label="Weight"
          type="number"
          step="0.01"
          value={formState.weight?.toString() ?? ""}
          onChange={(e) =>
            onFormChange({
              ...formState,
              weight: parseFloat(e.target.value) || undefined,
            })
          }
        />

        <Input
          id="dimensions"
          label="Dimensions"
          placeholder="e.g., 10x5x2 cm"
          value={formState.dimensions ?? ""}
          onChange={(e) =>
            onFormChange({ ...formState, dimensions: e.target.value })
          }
        />

        <Input
          id="stockQuantity"
          label="Stock Quantity"
          type="number"
          value={formState.stock_quantity.toString()}
          onChange={(e) =>
            onFormChange({
              ...formState,
              stock_quantity: parseInt(e.target.value) || 0,
            })
          }
          required
        />

        {/* Usage & testing */}
        <Input
          id="intendedUse"
          label="Intended Use"
          value={formState.intended_use ?? ""}
          onChange={(e) =>
            onFormChange({ ...formState, intended_use: e.target.value })
          }
        />

        <Input
          id="testType"
          label="Test Type"
          value={formState.test_type ?? ""}
          onChange={(e) =>
            onFormChange({ ...formState, test_type: e.target.value })
          }
        />

        <Textarea
          id="sampleType"
          label="Sample Type(s)"
          rows={2}
          placeholder="Comma-separate multiple sample types"
          value={sampleTypeText}
          onChange={(e) => setSampleTypeText(e.target.value)}
          onBlur={() =>
            onFormChange({
              ...formState,
              sample_type: stringToList(sampleTypeText),
            })
          }
        />

        <Input
          id="resultsTime"
          label="Results Time"
          placeholder="e.g., 24-48 hours"
          value={formState.results_time ?? ""}
          onChange={(e) =>
            onFormChange({ ...formState, results_time: e.target.value })
          }
        />

        <Input
          id="storageConditions"
          label="Storage Conditions"
          placeholder="e.g., Refrigerate at 4°C"
          value={formState.storage_conditions ?? ""}
          onChange={(e) =>
            onFormChange({
              ...formState,
              storage_conditions: e.target.value,
            })
          }
        />

        <Textarea
          id="regulatoryApprovals"
          label="Regulatory Approvals"
          rows={2}
          placeholder="Comma-separate approvals"
          value={regulatoryApprovalsText}
          onChange={(e) => setRegulatoryApprovalsText(e.target.value)}
          onBlur={() =>
            onFormChange({
              ...formState,
              regulatory_approvals: stringToList(regulatoryApprovalsText),
            })
          }
        />

        <Textarea
          id="kitContents"
          label="Kit Contents Summary"
          rows={3}
          value={formState.kit_contents_summary ?? ""}
          onChange={(e) =>
            onFormChange({
              ...formState,
              kit_contents_summary: e.target.value,
            })
          }
        />

        <Input
          id="userManualUrl"
          label="User Manual URL"
          type="url"
          value={formState.user_manual_url ?? ""}
          onChange={(e) =>
            onFormChange({ ...formState, user_manual_url: e.target.value })
          }
        />

        <Textarea
          id="warningsAndPrecautions"
          label="Warnings & Precautions"
          rows={2}
          placeholder="Comma-separate warnings"
          value={warningsAndPrecautionsText}
          onChange={(e) => setWarningsAndPrecautionsText(e.target.value)}
          onBlur={() =>
            onFormChange({
              ...formState,
              warnings_and_precautions: stringToList(
                warningsAndPrecautionsText
              ),
            })
          }
        />

        {/* Active toggle */}
        <Checkbox
          id="isActive"
          checked={formState.is_active}
          onChange={(e) =>
            onFormChange({ ...formState, is_active: e.target.checked })
          }
          label="Is Active"
        />

        {/* Actions */}
        <div className="flex space-x-3 mt-6">
          <Button type="submit" isLoading={isSubmitting}>
            {selectedProductId ? "Update Product" : "Create Product"}
          </Button>

          {selectedProductId && (
            <>
              <Button type="button" variant="secondary" onClick={onReset}>
                New Product
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={onDelete}
                isLoading={isDeleting}
              >
                Delete Product
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
