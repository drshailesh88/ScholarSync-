"use client";
/**
 * LayersPanel Component
 *
 * Displays and manages layers for the illustration editor.
 * Integrates with the layerStore for state management.
 *
 * @module components/illustration/LayersPanel
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  useLayerStore,
  useLayers,
  useActiveLayerId,
  type StoreLayer,
  createLayer,
} from '@/stores/illustration/layerStore';

// ============================================================================
// TYPES
// ============================================================================

interface LayerRowProps {
  layer: StoreLayer;
  isActive: boolean;
  isDragging: boolean;
  isDropTarget: boolean;
  onSelect: () => void;
  onToggleVisibility: () => void;
  onToggleLock: () => void;
  onRename: (name: string) => void;
  onDelete: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

// ============================================================================
// STYLES
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  panel: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'var(--bg-secondary)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: '1px solid var(--border-primary)',
  },
  headerTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  headerActions: {
    display: 'flex',
    gap: '4px',
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  iconButtonHover: {
    backgroundColor: 'var(--bg-hover)',
  },
  layersList: {
    flex: 1,
    overflowY: 'auto',
    padding: '8px',
  },
  layerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 150ms ease',
    userSelect: 'none',
  },
  layerRowActive: {
    backgroundColor: 'var(--accent-primary)',
    color: 'white',
  },
  layerRowDragging: {
    opacity: 0.5,
  },
  layerRowDropTarget: {
    borderTop: '2px solid var(--accent-primary)',
  },
  layerRowHover: {
    backgroundColor: 'var(--bg-hover)',
  },
  layerDragHandle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    color: 'var(--text-muted)',
    cursor: 'grab',
  },
  layerVisibility: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
  },
  layerLock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
  },
  layerName: {
    flex: 1,
    fontSize: '13px',
    color: 'inherit',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'text',
  },
  layerNameInput: {
    flex: 1,
    fontSize: '13px',
    padding: '4px 6px',
    border: '1px solid var(--accent-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    outline: 'none',
  },
  layerDelete: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    opacity: 0,
    transition: 'opacity 150ms ease',
  },
  layerRowHoverDelete: {
    opacity: 1,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 16px',
    color: 'var(--text-muted)',
    textAlign: 'center',
  },
  emptyIcon: {
    width: '48px',
    height: '48px',
    marginBottom: '12px',
    opacity: 0.4,
  },
  emptyText: {
    fontSize: '12px',
    lineHeight: 1.5,
  },
};

// ============================================================================
// ICONS
// ============================================================================

const AddIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const UnlockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </svg>
);

const GripIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="5" r="1" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="5" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>
);

// ============================================================================
// LAYER ROW COMPONENT
// ============================================================================

function LayerRow({
  layer,
  isActive,
  isDragging,
  isDropTarget,
  onSelect,
  onToggleVisibility,
  onToggleLock,
  onRename,
  onDelete,
  onDragStart,
  onDragEnd,
}: LayerRowProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(layer.name);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmitName = useCallback(() => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== layer.name) {
      onRename(trimmed);
    }
    setIsEditing(false);
    setEditValue(layer.name);
  }, [editValue, layer.name, onRename]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSubmitName();
      } else if (e.key === 'Escape') {
        setIsEditing(false);
        setEditValue(layer.name);
      }
    },
    [handleSubmitName, layer.name]
  );

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData('text/plain', layer.id);
      e.dataTransfer.effectAllowed = 'move';
      onDragStart();
    },
    [layer.id, onDragStart]
  );

  const rowStyle = {
    ...styles.layerRow,
    ...(isActive ? styles.layerRowActive : {}),
    ...(isDragging ? styles.layerRowDragging : {}),
    ...(isDropTarget ? styles.layerRowDropTarget : {}),
    ...(isHovered && !isActive ? styles.layerRowHover : {}),
  };

  const deleteStyle = {
    ...styles.layerDelete,
    ...(isHovered ? styles.layerRowHoverDelete : {}),
  };

  return (
    <div
      style={rowStyle}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Drag Handle */}
      <div style={styles.layerDragHandle}>
        <GripIcon />
      </div>

      {/* Visibility Toggle */}
      <button
        style={styles.layerVisibility}
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisibility();
        }}
        title={layer.visible ? 'Hide layer' : 'Show layer'}
      >
        {layer.visible ? <EyeIcon /> : <EyeOffIcon />}
      </button>

      {/* Layer Name */}
      {isEditing ? (
        <input aria-label="Text input"
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSubmitName}
          onKeyDown={handleKeyDown}
          style={styles.layerNameInput}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span
          style={styles.layerName}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          {layer.name}
        </span>
      )}

      {/* Lock Toggle */}
      <button
        style={styles.layerLock}
        onClick={(e) => {
          e.stopPropagation();
          onToggleLock();
        }}
        title={layer.locked ? 'Unlock layer' : 'Lock layer'}
      >
        {layer.locked ? <LockIcon /> : <UnlockIcon />}
      </button>

      {/* Delete Button */}
      <button
        style={deleteStyle}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="Delete layer"
      >
        <TrashIcon />
      </button>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const LayersPanel: React.FC = () => {
  const layers = useLayers();
  const activeLayerId = useActiveLayerId();
  const layerCount = useLayerStore((state) => state.layers.length);
  const dragState = useLayerStore((state) => state.dragState);

  const {
    setActiveLayer,
    toggleLayerVisibility,
    toggleLayerLock,
    renameLayer,
    removeLayer,
    addLayer,
    startDrag,
    endDrag,
    setDropTarget,
    reorderLayers,
  } = useLayerStore(
    useShallow((state) => ({
      setActiveLayer: state.setActiveLayer,
      toggleLayerVisibility: state.toggleLayerVisibility,
      toggleLayerLock: state.toggleLayerLock,
      renameLayer: state.renameLayer,
      removeLayer: state.removeLayer,
      addLayer: state.addLayer,
      startDrag: state.startDrag,
      endDrag: state.endDrag,
      setDropTarget: state.setDropTarget,
      reorderLayers: state.reorderLayers,
    }))
  );

  // Add new layer handler
  const handleAddLayer = useCallback(() => {
    const maxOrder = Math.max(...layers.map((l) => l.order), -1);
    const newLayer = createLayer(`Layer ${layers.length + 1}`, maxOrder + 1);
    addLayer(newLayer);
    setActiveLayer(newLayer.id);
  }, [layers, addLayer, setActiveLayer]);

  // Toggle layer visibility handler
  const handleToggleVisibility = useCallback(
    (layerId: string) => {
      toggleLayerVisibility(layerId);
    },
    [toggleLayerVisibility]
  );

  // Toggle layer lock handler
  const handleToggleLock = useCallback(
    (layerId: string) => {
      toggleLayerLock(layerId);
    },
    [toggleLayerLock]
  );

  // Rename layer handler
  const handleRename = useCallback(
    (layerId: string, name: string) => {
      renameLayer(layerId, name);
    },
    [renameLayer]
  );

  // Delete layer handler
  const handleDelete = useCallback(
    (layerId: string) => {
      if (layerCount <= 1) {
        return; // Can't delete the last layer
      }
      if (confirm('Delete this layer?')) {
        removeLayer(layerId);
      }
    },
    [layerCount, removeLayer]
  );

  // Drag start handler
  const handleDragStart = useCallback(
    (layerId: string) => {
      startDrag(layerId);
    },
    [startDrag]
  );

  // Drag end handler
  const handleDragEnd = useCallback(() => {
    endDrag();
    setDropTarget(null);
  }, [endDrag, setDropTarget]);

  // Drag over handler
  const handleDragOver = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (dragState.draggedLayerId !== targetId) {
        setDropTarget(targetId);
      }
    },
    [dragState.draggedLayerId, setDropTarget]
  );

  // Drop handler
  const handleDrop = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      const draggedId = dragState.draggedLayerId;
      if (!draggedId || draggedId === targetId) {
        endDrag();
        setDropTarget(null);
        return;
      }

      // Reorder layers
      const draggedIndex = layers.findIndex((l) => l.id === draggedId);
      const targetIndex = layers.findIndex((l) => l.id === targetId);

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newOrder = [...layers];
        const [draggedLayer] = newOrder.splice(draggedIndex, 1);
        newOrder.splice(targetIndex, 0, draggedLayer);

        // Update order values and reorder
        const reorderedIds = newOrder.map((l) => l.id);
        reorderLayers(reorderedIds);
      }

      endDrag();
      setDropTarget(null);
    },
    [dragState.draggedLayerId, layers, endDrag, setDropTarget, reorderLayers]
  );

  // Render layers in reverse order (top layer first in UI)
  const reversedLayers = [...layers].reverse();

  return (
    <div style={styles.panel}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.headerTitle}>Layers</span>
        <div style={styles.headerActions}>
          <button
            style={styles.iconButton}
            onClick={handleAddLayer}
            title="Add new layer"
          >
            <AddIcon />
          </button>
        </div>
      </div>

      {/* Layers List */}
      <div style={styles.layersList}>
        {reversedLayers.length === 0 ? (
          <div style={styles.emptyState}>
            <svg
              style={styles.emptyIcon}
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <div style={styles.emptyText}>No layers yet</div>
            <div style={{ fontSize: '11px', marginTop: '8px' }}>
              Click + to add a layer
            </div>
          </div>
        ) : (
          reversedLayers.map((layer) => (
            <div
              key={layer.id}
              onDragOver={(e) => handleDragOver(e, layer.id)}
              onDrop={(e) => handleDrop(e, layer.id)}
            >
              <LayerRow
                layer={layer}
                isActive={layer.id === activeLayerId}
                isDragging={dragState.draggedLayerId === layer.id}
                isDropTarget={dragState.dropTargetId === layer.id}
                onSelect={() => setActiveLayer(layer.id)}
                onToggleVisibility={() => handleToggleVisibility(layer.id)}
                onToggleLock={() => handleToggleLock(layer.id)}
                onRename={(name) => handleRename(layer.id, name)}
                onDelete={() => handleDelete(layer.id)}
                onDragStart={() => handleDragStart(layer.id)}
                onDragEnd={handleDragEnd}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LayersPanel;
